import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@figment-near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const {network, accountId} = req.body;
  try {
    const config = configFromNetwork(network);
    const near = await connect(config);
    const account = await near.account(accountId);
    // Using ViewFunction try to call the contract
    const response = undefined;
    return res.status(200).json(response);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
