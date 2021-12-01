import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@figment-near/lib';
import {connect, KeyPair} from 'near-api-js';
import fs from 'fs';

// The symbolic link /out/main.wasm points to /contracts/near/target/release/wasm32-unknown-unknown/release/greeter.wasm
const WASM_PATH = 'contracts/near/out/main.wasm';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const {secret, accountId, network} = req.body;
  try {
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);

    // Again you will need to set your keystore
    config.keyStore?.undefined;

    const near = await connect(config);
    const account = await near.account(accountId);

    // Time to deploy the Smart Contract
    const response = undefined;
    return res.status(200).json(response.transaction.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
