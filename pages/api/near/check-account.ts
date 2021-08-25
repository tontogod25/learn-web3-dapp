import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetwork } from "@near/lib";
import { connect } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<boolean | string>
) {
    try {
        const { freeAccountId, network } = req.body
        const config = configFromNetwork(network);
        const near = await connect(config);
        const accountInfo = await near.account(freeAccountId);
        try {
            await accountInfo.state();
            return res.status(200).json(false)
        } catch (error) {
            return res.status(200).json(true)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json('Checking availability failed')
    } 
}
