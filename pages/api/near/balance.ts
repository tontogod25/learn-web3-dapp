import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/utils'
import { connect } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";


export default async function(
  req: NextApiRequest,
  res: NextApiResponse<AccountBalance | string>
) {
    const { networkId, accountId } = req.body;

    try {
        const config = configFromNetworkId(networkId);       
        const client = await connect(config);
        const account = await client.account(accountId);
        const balance = await account.getAccountBalance();
        console.log(balance)
        return res.status(200).json(balance)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error transfer to NEAR')
    } 
}
