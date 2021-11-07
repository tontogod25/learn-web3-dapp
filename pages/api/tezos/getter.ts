import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {getTezosUrl} from '@figment-tezos/lib';
import {importKey} from '@taquito/signer';

export default async function getter(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {mnemonic, email, password, secret, contract} = req.body;
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    // use the contract module to get the storage
    const counter = undefined;

    // @ts-ignore
    res.status(200).json(counter.toString());
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
