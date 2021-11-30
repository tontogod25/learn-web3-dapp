/* eslint-disable no-unreachable */
import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {importKey} from '@taquito/signer';
import {getNodeUrl} from '@figment-tezos/lib';

export default async function account(
  req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    const {
      mnemonic: mnemonic0,
      email,
      password,
      activation_code: secret,
      network,
    } = req.body;
    const mnemonic = mnemonic0.join(' ');

    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    // call the importKey method
    undefined;
    throw new Error('Please complete the code');

    res.status(200).json(true);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
