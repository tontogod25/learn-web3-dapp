import type {NextApiRequest, NextApiResponse} from 'next';

import {ApiPromise, WsProvider} from '@polkadot/api';
import {getSafeUrl} from '@figment-polkadot/lib';

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<number | string>,
) {
  let provider;
  try {
    const {mnemonic, txAmount} = req.body;

    const url = getSafeUrl();
    provider = new WsProvider(url);
    const api = await ApiPromise.create({provider: provider});

    // Initialize account from the mnemonic
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);

    // Initialize account from the mnemonic
    const recipient = keyring.addFromUri('//Alice');
    const recipientAddr = recipient.address;

    // Transfer tokens
    const transfer = undefined;
    const hash = await transfer.signAndSend(account);

    await provider.disconnect();
    res.status(200).json(hash.toString());
  } catch (error) {
    if (provider) {
      await provider.disconnect();
    }
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
