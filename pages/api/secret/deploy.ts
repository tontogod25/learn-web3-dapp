import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';
import {getNodeUrl} from '@figment-secret/lib';
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
    const url = await getNodeUrl();
    const {mnemonic} = req.body;
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const address = pubkeyToAddress(pubkey, 'secret');

    // Initialise client
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
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
