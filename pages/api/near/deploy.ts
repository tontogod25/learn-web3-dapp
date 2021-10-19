import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect, KeyPair} from 'near-api-js';
import fs from 'fs';

// The symbolic link /out/main.wasm points to /contracts/near/target/release/wasm32-unknown-unknown/release/greeter.wasm
const WASM_PATH = 'contracts/near/out/main.wasm';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {NETWORK, ACCOUNT_ID, SECRET} = req.body;
    const config = configFromNetwork(NETWORK);
    const keypair = KeyPair.fromString(SECRET);

    // Again you will need to set your keystore
    config.keyStore?.undefined;

    const near = await connect(config);
    const account = await near.account(ACCOUNT_ID);

    // Time to deploy the Smart Contract
    const response = undefined;
    return res.status(200).json(response.transaction.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
