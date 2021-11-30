import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {getNodeUrl} from '@figment-tezos/lib';
import {importKey} from '@taquito/signer';

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network, mnemonic, email, password, secret, amount, recipient} =
      req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(undefined);

    // call the transfer method

    // await for confirmation
    await operation.confirmation(1);

    res.status(200).json(operation.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
