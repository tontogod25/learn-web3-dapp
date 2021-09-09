import {Connection, PublicKey, LAMPORTS_PER_SOL} from '@solana/web3.js';
import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from 'utils/datahub-utils';

export default async function fund(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network} = req.body;
    const url = getNodeURL(
      CHAINS.SOLANA,
      SOLANA_NETWORKS.DEVNET,
      SOLANA_PROTOCOLS.RPC,
      network,
    ) as string;
    console.log(url);
    const connection = new Connection(url, 'confirmed');
    const address = req.body.address as PublicKey;
    const publicKey = new PublicKey(address);
    const hash = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(hash);
    res.status(200).json(hash);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
