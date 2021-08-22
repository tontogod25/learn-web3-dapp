import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@solana/lib';

export default async function fund(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed")
    const address = req.body.address as PublicKey;
    const publicKey = undefined  
    const hash = undefined
    await undefined
    res.status(200).json(hash)
  } catch(error) {
    console.error(error)
    res.status(500).json('airdrop failed')
  }
}
