import type {NextApiRequest, NextApiResponse} from 'next';
import {Connection, PublicKey} from '@solana/web3.js';
import {getNodeURL} from '@solana/lib';

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<string | number>,
) {
  try {
    const {network, address} = req.body;
    const url = getNodeURL(network);
    const connection = new Connection(url, 'confirmed');
    const publicKey = undefined;
    const balance = undefined;
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
