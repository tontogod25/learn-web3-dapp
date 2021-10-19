import type {NextApiRequest, NextApiResponse} from 'next';
import {getAvalancheClient} from '@figment-avalanche/lib';
import {BalanceT} from '@figment-avalanche/types';

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {address, network} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const balance = undefined;
    res.status(200).json(balance.balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
