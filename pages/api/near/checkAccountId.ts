import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from "@near/utils";
import { connect } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<boolean | string>
) {
    const { accountId, networkId } = req.body
    try {
        const config = configFromNetworkId(networkId);
        const near = await connect(config);
        const accountInfo = await near.account(accountId);
        try {
            await accountInfo.state();
            return res.status(200).json(false)
        } catch (error) {
            console.error(error)
            return res.status(200).json(true)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error connection to NEAR')
    } 
}
