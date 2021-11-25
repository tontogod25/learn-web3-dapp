import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = getNodeUrl();
    const {mnemonic, contractId} = req.body;
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const address = pubkeyToAddress(pubkey, 'secret');

    const customFees = {
      exec: {
        amount: [{amount: '500000', denom: 'uscrt'}],
        gas: '500000',
      },
    };
    // Initialise client
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    const client = new SigningCosmWasmClient(
      url,
      address,
      (signBytes) => signingPen.sign(signBytes),
      txEncryptionSeed,
      customFees,
    );

    // Increment the counter
    const handleMsg = {increment: {}};
    const response = undefined;

    res.status(200).json(response.transactionHash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
