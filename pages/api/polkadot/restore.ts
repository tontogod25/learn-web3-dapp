import type { NextApiRequest, NextApiResponse } from 'next'
import { Keyring } from "@polkadot/api"

export default async function restore(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const { memo } = req.body    
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(memo);
    const address = account.address;
    res.status(200).json(address);
  } catch (error) {
    console.log(error)
    res.status(500).json("Unable to restore account")
  }
}
