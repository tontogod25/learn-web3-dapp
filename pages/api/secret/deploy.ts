import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';
import {getSafeUrl} from 'components/protocols/secret/lib';
import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';

const CONTRACT_PATH = './contracts/secret/contract.wasm';

const customFees = {
  upload: {
    amount: [{amount: '2000000', denom: 'uscrt'}],
    gas: '2000000',
  },
  init: {
    amount: [{amount: '500000', denom: 'uscrt'}],
    gas: '500000',
  },
};

type ResponseT = {
  contractAddress: string;
  transactionHash: string;
};
export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const url = await getSafeUrl();
    const {mnemonic} = req.body;
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const address = pubkeyToAddress(pubkey, 'secret');

    // 1. Initialise client
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    const client = new SigningCosmWasmClient(
      url,
      address,
      (signBytes) => signingPen.sign(signBytes),
      txEncryptionSeed,
      customFees,
    );

    // Upload the contract wasm
    const wasm = fs.readFileSync(CONTRACT_PATH);
    const uploadReceipt = await client.undefined;
    if (!uploadReceipt) {
      throw new Error('uploadReceipt error');
    }
    // Get the code ID from the receipt
    const {codeId} = uploadReceipt;

    // Create an instance of the Counter contract, providing a starting count
    const initMsg = {count: 101};
    const receipt = undefined;

    res.status(200).json({
      contractAddress: receipt.contractAddress,
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('contract deployement failed');
  }
}
