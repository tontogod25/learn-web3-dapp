import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/lib'
import { connect } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const { networkId, accountId  } = req.body;

    try {
        const config = configFromNetworkId(networkId);
        const near = await connect(config);
        const account = await near.account(accountId);
        const response = await account.viewFunction(accountId, "get_greeting", {account_id: accountId});
        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json('failed to read contract')
    } 
}
