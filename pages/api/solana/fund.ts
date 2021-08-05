import { Connection, PublicKey, PublicKeyInitData, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SOLANA_NETWORKS, SOLANA_PROTOCOLS } from 'types/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSolanaUrl } from '@solana/lib';

export default async function fund(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    // const url = getSolanaUrl(SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC);
    // const connection = new Connection(url)
    const connection = new Connection("https://api.testnet.solana.com", "confirmed");
    const address = new PublicKey(req.body.address as PublicKey)  
    const signature = await connection.requestAirdrop(address, LAMPORTS_PER_SOL)
    await connection.confirmTransaction(signature);
    console.log(signature)
    res.status(200).json(signature)
  } catch(error) {
    console.error(error)
    res.status(500).json('airdrop failed')
  }
}
