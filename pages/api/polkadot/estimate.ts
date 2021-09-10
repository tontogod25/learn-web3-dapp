import type {NextApiRequest, NextApiResponse} from 'next';
import {ApiPromise} from '@polkadot/api';
import {WsProvider} from '@polkadot/rpc-provider';
import {getSafeUrl} from '@polka/lib';

export default async function estimate(
  req: NextApiRequest,
  res: NextApiResponse<number | string>,
) {
  try {
    const {address} = req.body;

    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({provider: provider});

    // A generic address for recipient (//Alice) and amount to send
    const recipient = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
    const transferAmount = '1000000000';

    // Transfer tokens
    const transfer = undefined;
    const info = undefined;
    const fees = undefined;

    res.status(200).json(fees);
  } catch (error) {
    console.log(error);
    res.status(500).json('Connection to network failed');
  }
}
