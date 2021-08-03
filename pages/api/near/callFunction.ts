import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/lib'
import { connect,KeyPair } from "near-api-js";

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const { networkId, accountId, secretKey, newMessage } = req.body;

    try {
       const config = configFromNetworkId(networkId);
        const keypair = KeyPair.fromString(secretKey);
        config.keyStore?.setKey(networkId, accountId, keypair);        

        const near = await connect(config);
        const account = await near.account(accountId);
        
        const optionsCall = {
            contractId: accountId,
            methodName: 'set_greeting',
            args: { message: newMessage }
        }
        const response = await account.functionCall(optionsCall);
        console.log(response)
        return res.status(200).json(response.transaction.hash)
    } catch (error) {
        console.error(error)
        return res.status(500).json('cannot change the value')
    } 
}
