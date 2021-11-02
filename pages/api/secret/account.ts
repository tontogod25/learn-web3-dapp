import type {NextApiRequest, NextApiResponse} from 'next';
import {Secp256k1Pen, pubkeyToAddress, encodeSecp256k1Pubkey} from 'secretjs';
import {Bip39, Random} from '@iov/crypto';

type ResponseT = {
  mnemonic: string;
  address: string;
};
export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const mnemonic = undefined;
    const signingPen = await undefined;
    const pubkey = undefined;
    const address = undefined;
    res.status(200).json({mnemonic, address});
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
