import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {freeAccountId, publicKey, network} = req.body;
    const config = configFromNetwork(network);
    const near = await connect(config);
    undefined;
    return res.status(200).json(freeAccountId);
  } catch (error) {
    console.error(error);
    return res.status(500).json(`Account creation Failed`);
  }
}
