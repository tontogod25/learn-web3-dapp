import { Connection, PublicKey  } from '@solana/web3.js';
import { SOLANA_NETWORKS, SOLANA_PROTOCOLS } from 'types/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSolanaUrl } from '@solana/lib';

export default async function fund(
  req: NextApiRequest,
  res: NextApiResponse<string | number>
) {
  try {
    // const url = getSolanaUrl(SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC);
    // const connection = new Connection(url)
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const address = new PublicKey(req.body.address as PublicKey)  
    const balance = await connection.getBalance(address)
    console.log(balance)
    res.status(200).json(balance)
  } catch(error) {
    console.error(error)
    res.status(500).json('balance failed')
  }
}
