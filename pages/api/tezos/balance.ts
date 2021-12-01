import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {getNodeUrl} from '@figment-tezos/lib';

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {address, network} = req.body;
    const url = getNodeUrl(network);
    const toolkit = new TezosToolkit(url);
    const balance = undefined;
    res.status(200).json(balance.toString());
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
