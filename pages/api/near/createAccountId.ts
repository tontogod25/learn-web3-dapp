
import type { NextApiRequest, NextApiResponse } from 'next'

import { getNearConfig } from "utils/near-utils";

import { connect as nearConnect } from "near-api-js";
import type { AccountView } from 'near-api-js/lib/providers/provider';
import type { PublicKey } from 'near-api-js/src/utils';


type AccountReq = {
    accountId: string,
    publicKey: PublicKey,
}

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<AccountView | string>
) {
    const { accountId, publicKey }: AccountReq = req.body
    try {
        const config = getNearConfig();
        const near = await nearConnect(config);
        const account = await near.createAccount(accountId, publicKey);
        const accountInfo = await account.state();
        return res.status(200).json(accountInfo)
    } catch (error) {
        console.error(error)
        return res.status(500).json(`Error creating ${accountId}, with keys: ${publicKey}`)
    } 
}
