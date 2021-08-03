import type { NextApiRequest, NextApiResponse } from 'next'
import { configFromNetworkId } from '@near/lib'
import { connect, KeyPair } from "near-api-js";
import fs from 'fs';

const WASM_PATH = 'contracts/near/out/main.wasm'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const { networkId, accountId, secretKey } = req.body;

    try {
        const config = configFromNetworkId(networkId);
        const keypair = KeyPair.fromString(secretKey);
        config.keyStore?.setKey(networkId, accountId, keypair);        

        const near = await connect(config);
        const account = await near.account(accountId);
        const response = await account.deployContract(fs.readFileSync(WASM_PATH));
        console.log(response)
        return res.status(200).json(response.transaction.hash)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Contract deployement failed")
    } 
}
