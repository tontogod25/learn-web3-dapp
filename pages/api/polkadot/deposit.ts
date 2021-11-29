import type {NextApiRequest, NextApiResponse} from 'next';

import {ApiPromise, WsProvider} from '@polkadot/api';
import {getNodeUrl} from '@figment-polkadot/lib';

export default async function deposit(
  req: NextApiRequest,
  res: NextApiResponse<number | string>,
) {
  let provider;
  try {
    const {network} = req.body;
    const url = getNodeUrl(network);
    provider = new WsProvider(url);
    const api = await ApiPromise.create({provider: provider});
    const deposit = undefined;
    await provider.disconnect();
    res.status(200).json(deposit);
  } catch (error) {
    if (provider) {
      await provider.disconnect();
    }
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
