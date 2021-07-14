import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/utils'
import { connect, KeyPair } from "near-api-js";
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import BN from 'bn.js';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<FinalExecutionOutcome | string>
) {
    const {
        txSender,
        txAmount,
        txReceiver,
        networkId,
        secretKey,
    } = req.body;

    try {
        const config = configFromNetworkId(networkId);
        const keypair = KeyPair.fromString(secretKey);
        console.log(keypair);
        config.keyStore?.setKey(networkId, txSender, keypair);
        
        const client = await connect(config);
        const account = await client.account(txSender);
        const amount = new BN(parseFloat(txAmount));
        const result = await account.sendMoney(txReceiver, amount);
        console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error transfer to NEAR')
    } 
}
