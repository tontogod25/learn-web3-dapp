import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from 'utils/datahub-utils';
import {Connection} from '@solana/web3.js';

export default async function connect(
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
    );
    const connection = new Connection(url, 'confirmed');
    const version = await connection.getVersion();
    res.status(200).json(version?.['solana-core']);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
