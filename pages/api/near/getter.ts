import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetwork } from '@near/lib'
import { connect } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const { network, accountId  } = req.body;
        const config = configFromNetwork(network);
        const near = await connect(config);
        const account = await near.account(accountId);
        const response = await account.viewFunction(
            accountId, 
            "get_greeting",
            { account_id: accountId }
        );
        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Reading Message of Contract failed')
    } 
}
