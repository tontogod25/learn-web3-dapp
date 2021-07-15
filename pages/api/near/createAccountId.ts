import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from "@near/utils";
import { connect } from "near-api-js";
import type { PublicKey } from 'near-api-js/src/utils';

type AccountReq = {
    freeAccountId: string
    publicKey: PublicKey
    networkId: string
}

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const { freeAccountId, publicKey, networkId }: AccountReq = req.body
    try {
        const config = configFromNetworkId(networkId);
        const near = await connect(config);
        const account = await near.createAccount(freeAccountId, publicKey);
        console.log(account);
        // const accountInfo = await account.state();
        return res.status(200).json(freeAccountId)
    } catch (error) {
        console.error(error)
        return res.status(500).json(`Error creating ${freeAccountId}, with keys: ${publicKey}`)
    } 
}
