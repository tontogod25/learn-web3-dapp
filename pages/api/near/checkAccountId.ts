import type { NextApiRequest, NextApiResponse } from 'next'

import { getNearConfig } from "utils/near-utils";

import { connect as nearConnect  } from "near-api-js";

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<boolean | string>
) {
    const { accountId } = req.body
    try {
        const config = getNearConfig();
        const near = await nearConnect(config);
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
