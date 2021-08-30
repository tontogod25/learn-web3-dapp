import type { NextApiRequest, NextApiResponse } from 'next'

import { ApiPromise, Keyring } from "@polkadot/api"
import { WsProvider } from '@polkadot/rpc-provider';
import { getSafeUrl } from "@polka/lib"

export default async function transfer(
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
    const transfer = await api.tx.balances.transfer(recipientAddr, txAmount)
    const hash = await transfer.signAndSend(account)
    console.log('Transfer sent with hash', hash.toHex());
    
    res.status(200).json(hash.toString())
  } catch (error) {
    console.log(error)
    res.status(500).json("Connection to network failed")
  }
}
