import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect, KeyPair} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network, accountId, secret, newMessage} = req.body;
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);
    config.keyStore?.setKey(network, accountId, keypair);

    const near = await connect(config);
    const account = await near.account(accountId);
    // Look at functionCall and pass the expected args
    // ... fill here
    return res.status(200).json(response.transaction.hash);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Setting Message of Contract failed');
  }
}
