import type { NextApiRequest, NextApiResponse } from 'next'

import { ApiPromise, Keyring } from "@polkadot/api"
import { WsProvider } from '@polkadot/rpc-provider';
import { getSafeUrl } from "@polka/lib"

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<number | string>
) {
  try {
    const { mnemonic, txAmount } = req.body

    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider })

    // Initialize account from the mnemonic
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);

    // Initialize account from the mnemonic
    const recipient = keyring.addFromUri('//Alice');
    const recipientAddr = recipient.address

    // Transfer tokens
    const transfer =  api.tx.balances.transfer(recipientAddr, txAmount)
    const info = await transfer.paymentInfo(account)
    const fees = info.partialFee.toNumber()

    res.status(200).json(fees)
  } catch (error) {
    console.log(error)
    res.status(500).json("Connection to network failed")
  }
}
