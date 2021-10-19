import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {NETWORK, ACCOUNT_ID} = req.body;
    const config = configFromNetwork(NETWORK);
    const near = await connect(config);
    const account = await near.account(ACCOUNT_ID);
    // Using ViewFunction try to call the contract
    const response = undefined;
    return res.status(200).json(response);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
