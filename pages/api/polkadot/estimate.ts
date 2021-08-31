import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiPromise } from "@polkadot/api"
import { WsProvider } from '@polkadot/rpc-provider';
import { getSafeUrl } from "@polka/lib"

export default async function estimate(
  req: NextApiRequest,
  res: NextApiResponse<number | string>
) {
  try {
    const { address } = req.body

    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider })
    
    // A generic address (//Alice)
    const recipient = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'

    // Transfer tokens
    const gigaPlanck = '1000000000';
    const transfer =  api.tx.balances.transfer(recipient, gigaPlanck)
    const info = await transfer.paymentInfo(address)
    const fees = info.partialFee.toNumber()

    res.status(200).json(fees)
  } catch (error) {
    console.log(error)
    res.status(500).json("Connection to network failed")
  }
}
