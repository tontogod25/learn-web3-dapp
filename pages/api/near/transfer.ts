import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/lib'
import { connect, KeyPair } from 'near-api-js'
import { FinalExecutionOutcome } from 'near-api-js/lib/providers'
import { parseNearAmount, formatNearAmount } from 'near-api-js/lib/utils/format'
import BN from 'bn.js'

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<FinalExecutionOutcome | string>
) {
    const {
        txSender,
        txAmount,
        txReceiver,
        networkId,
        secretKey,
    } = req.body

    try {
        const config = configFromNetworkId(networkId)
        const keypair = KeyPair.fromString(secretKey)
        config.keyStore?.setKey(networkId, txSender, keypair)       
        const client = await connect(config)
        const account = await client.account(txSender)
        const yoctoAmount = parseNearAmount(txAmount) as string
        const amount = new BN(yoctoAmount) // TypeScript enforces the BN (BigNumber) type for the amount argument of sendMoney()
        const transaction = await account.sendMoney(txReceiver, amount)
        return res.status(200).json(transaction)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error transferring NEAR: ' + error.message)
    } 
}
