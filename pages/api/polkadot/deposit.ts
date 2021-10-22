import type {NextApiRequest, NextApiResponse} from 'next';

import {ApiPromise, WsProvider} from '@polkadot/api';
import {getSafeUrl} from '@figment-polkadot/lib';

export default async function deposit(
  _req: NextApiRequest,
  res: NextApiResponse<number | string>,
) {
  let provider;
  try {
    const url = getSafeUrl();
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
