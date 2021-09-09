import type {NextApiRequest, NextApiResponse} from 'next';
import {Keypair} from '@solana/web3.js';

type ResponseT = {
  secret: string;
  address: string;
};
export default function keypair(
  _req: NextApiRequest,
  res: NextApiResponse<string | ResponseT>,
) {
  const keypair = Keypair.generate();
  const address = keypair?.publicKey.toString();
  const secret = JSON.stringify(Array.from(keypair?.secretKey));
  res.status(200).json({
    secret,
    address,
  });
}
