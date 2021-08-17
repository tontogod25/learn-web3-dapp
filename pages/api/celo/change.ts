import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';

type ResponseT = {
    celo: string
    hash: string
}
export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>
) {
    try {
        const { secret } = req.body
        const url = getSafeUrl();
        const kit = newKit(url);

        const account = kit.web3.eth.accounts.privateKeyToAccount(secret)
        kit.addAccount(account.privateKey);

        // Get contract wrappers
        const stableToken = await kit.contracts.getStableToken();
        const exchange = await kit.contracts.getExchange();
        
        // Approve a user to transfer StableToken on behalf of another user.
        const OneCUSD = '1000000000000000000'
        const approveTx = await stableToken.approve(exchange.address, OneCUSD).send({from: account.address})

        // Exchange cUSD for CELO
        const goldAmount = await exchange.quoteStableSell(OneCUSD)
        const sellTx = await exchange.sellStable(OneCUSD, goldAmount).send({from: account.address})
        const sellReceipt = await sellTx.waitReceipt();

        console.log(goldAmount.toNumber())

        res.status(200).json({
            celo: goldAmount.toString(), 
            hash: sellReceipt.transactionHash
        })
    } catch(error) {
        console.error(error)
        res.status(500).json('Token Exchange failed')
    }
}
