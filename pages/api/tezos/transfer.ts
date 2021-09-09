import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {getTezosUrl} from '@tezos/lib';
import {importKey} from '@taquito/signer';

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {mnemonic, email, password, secret, amount, recipient} = req.body;
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(undefined);

    // call the transfer method

    // await for confirmation
    await operation.confirmation(1);

    res.status(200).json(operation.hash);
  } catch (error) {
    console.log(error);
    res.status(500).json('Transfer failed');
  }
}
