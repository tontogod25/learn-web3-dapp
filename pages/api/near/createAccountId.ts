import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from "@near/utils";
import { connect } from "near-api-js";
import type { AccountView } from 'near-api-js/lib/providers/provider';
import type { PublicKey } from 'near-api-js/src/utils';

type AccountReq = {
    accountId: string
    publicKey: PublicKey
    networkId: string
}

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<AccountView | string>
) {
    const { accountId, publicKey, networkId }: AccountReq = req.body
    try {
        const config = configFromNetworkId(networkId);
        const near = await connect(config);
        const account = await near.createAccount(accountId, publicKey);
        const accountInfo = await account.state();
        return res.status(200).json(accountInfo)
    } catch (error) {
        console.error(error)
        return res.status(500).json(`Error creating ${accountId}, with keys: ${publicKey}`)
    } 
}
