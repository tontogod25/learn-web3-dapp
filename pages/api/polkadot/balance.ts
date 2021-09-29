import type {NextApiRequest, NextApiResponse} from 'next';

import {ApiPromise} from '@polkadot/api';
import {WsProvider} from '@polkadot/rpc-provider';
import {getSafeUrl} from '@polkadot/lib';

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<number | string>,
) {
  try {
    const {address} = req.body;
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({provider: provider});
    const {data: balance} = undefined;
    const amount = undefined;
    res.status(200).json(amount);
  } catch (error) {
    console.log(error);
    res.status(500).json('Connection to network failed');
  }
}
