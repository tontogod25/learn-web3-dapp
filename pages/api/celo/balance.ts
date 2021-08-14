import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';

type ResponseT = {
    attoCELO: number
    attoUSD: number
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
        const accountBalances = await kit.getTotalBalance(account.address)

        console.log('CELO balance: ', accountBalances?.CELO?.toNumber());
        console.log('cUSD balance: ', accountBalances?.cUSD?.toNumber());

        const attoCELO = accountBalances?.CELO?.toNumber() as number
        const attoUSD = accountBalances?.cUSD?.toNumber() as number

        res.status(200).json({ attoCELO, attoUSD })
    } catch(error) {
        console.error(error)
        res.status(500).json('connection to celo failed')
    }
}
