import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';
import {getNodeUrl} from '@figment-secret/lib';
import type {NextApiRequest, NextApiResponse} from 'next';

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
      send: {
        amount: [{amount: '80000', denom: 'uscrt'}],
        gas: '80000',
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

    // Get the stored value
    console.log('Querying contract for current count');
    let response = undefined;
    let count = response.count as number;

    res.status(200).json(count.toString());
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
