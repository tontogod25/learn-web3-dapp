import type {NextApiRequest, NextApiResponse} from 'next';

import {ApiPromise} from '@polkadot/api';
import {WsProvider} from '@polkadot/rpc-provider';
import {getSafeUrl} from '@polkadot/lib';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = undefined;
    const rawVersion = undefined;
    const version = rawVersion.toHuman();
    res.status(200).json(version);
  } catch (error) {
    console.log(error);
    res.status(500).json('Connection to network failed');
  }
}
