import { Connection, PublicKey  } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSafeUrl } from '@solana/lib';

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<string | number>
) {
  try {
    const address = req.body.address as PublicKey;
    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed");
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    res.status(200).json(balance);
  } catch(error) {
    console.error(error);
    res.status(500).json('Get balance failed');
  }
}
