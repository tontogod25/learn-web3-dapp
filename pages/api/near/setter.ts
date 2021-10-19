import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect, KeyPair} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {NETWORK, ACCOUNT_ID, SECRET, newMessage} = req.body;
    const config = configFromNetwork(NETWORK);
    const keypair = KeyPair.fromString(SECRET);
    config.keyStore?.setKey('testnet', ACCOUNT_ID, keypair);

    const near = await connect(config);
    const account = await near.account(ACCOUNT_ID);
    // Look at functionCall and pass the expected args
    // ... fill here
    return res.status(200).json(response.transaction.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
