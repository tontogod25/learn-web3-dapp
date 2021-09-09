import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {Connection, PublicKey} from '@solana/web3.js';
import {getNodeURL} from 'utils/datahub-utils';

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<string | number>,
) {
  try {
    const {network, address} = req.body;
    const url = getNodeURL(
      CHAINS.SOLANA,
      SOLANA_NETWORKS.DEVNET,
      SOLANA_PROTOCOLS.RPC,
      network,
    );
    const connection = new Connection(url);
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    if (balance === 0) {
      throw new Error('Unfunded account, please go backward');
    }
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
