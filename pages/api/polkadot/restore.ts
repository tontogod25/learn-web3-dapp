import type { NextApiRequest, NextApiResponse } from 'next'
import { PolkadotAccountResponse } from '@polka/types';
import { Keyring } from "@polkadot/api"

export default async function restore(
  req: NextApiRequest,
  res: NextApiResponse<PolkadotAccountResponse | string>
) {
  try {
    const { mnemonic } = req.body
    
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;
    const jsonWallet = JSON.stringify(
        keyring.toJson(account.address), 
        null, 
        2
    )
  
    res.status(200).json({
        address,
        mnemonic,
        jsonWallet,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json("Connection to network failed")
  }
}
