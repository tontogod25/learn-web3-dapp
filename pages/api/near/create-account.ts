import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {freeAccountId, publicKey, NETWORK} = req.body;
    const config = configFromNetwork(NETWORK);
    const near = await connect(config);
    undefined;
    return res.status(200).json(freeAccountId);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
