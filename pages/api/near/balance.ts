import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetwork } from '@near/lib'
import { connect } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<string>
) { 
    try {
        const { network, accountId } = req.body;
        const config = configFromNetwork(network);       
        const client = await connect(config);
        const account = await client.account(accountId);
        const balance = await account.getAccountBalance();
        console.log(balance.available)
        return res.status(200).json(balance.available)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Balance querying failed')
    } 
}