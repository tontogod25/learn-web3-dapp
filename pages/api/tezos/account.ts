import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {importKey} from '@taquito/signer';
import {getNodeUrl} from '@figment-tezos/lib';

export default async function account(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {mnemonic, email, password, secret, network} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    // call the importKey method
    undefined;

    res.status(200).json('Activation of the account ok');
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
