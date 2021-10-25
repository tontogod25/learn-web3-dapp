import type {NextApiRequest, NextApiResponse} from 'next';

import {ApiPromise, WsProvider} from '@polkadot/api';
import {getSafeUrl} from '@figment-polkadot/lib';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  let provider;
  try {
    const url = getSafeUrl();
    provider = new WsProvider(url);
    const api = undefined;
    const rawVersion = undefined;
    const version = rawVersion.toHuman();
    await provider.disconnect();
    res.status(200).json(version);
  } catch (error) {
    if (provider) {
      await provider.disconnect();
    }
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
