import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/lib'
import { connect,KeyPair } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
    const { networkId, accountId, secretKey } = req.body;

    try {
       const config = configFromNetworkId(networkId);
        const keypair = KeyPair.fromString(secretKey);
        config.keyStore?.setKey(networkId, accountId, keypair);        

        const near = await connect(config);
        return res.status(200).json(true)
    } catch (error) {
        console.error(error)
        return res.status(500).json(false)
    } 
}