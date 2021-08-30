import type { NextApiRequest, NextApiResponse } from 'next'

import { ApiPromise } from "@polkadot/api"
import { WsProvider } from '@polkadot/rpc-provider';
import { getSafeUrl } from "@polka/lib"

export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<number | string>
) {
  try {
    const { address } = req.body
    console.log(address)

    const url = getSafeUrl();
    const provider = new WsProvider('wss://westend-rpc.polkadot.io')
    const api = await ApiPromise.create({ provider: provider })

    const { data: balance } = await api.query.system.account(address)
    const amount = balance.free.toNumber()
    console.log(amount)

    res.status(200).json(amount)
  } catch (error) {
    console.log(error)
    res.status(500).json("Connection to network failed")
  }
}
