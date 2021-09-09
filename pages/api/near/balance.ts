import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network, accountId} = req.body;
    const config = configFromNetwork(network);
    const client = await connect(config);
    const account = undefined;
    const balance = undefined;
    console.log(balance);
    return res.status(200).json(balance);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Balance querying failed');
  }
}
