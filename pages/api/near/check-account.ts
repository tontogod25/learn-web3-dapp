import type {NextApiRequest, NextApiResponse} from 'next';
import {configFromNetwork} from '@figment-near/lib';
import {connect} from 'near-api-js';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  const {freeAccountId, network} = req.body;
  try {
    const config = configFromNetwork(network);
    const near = await connect(config);
    // try to query the account info of the
    const accountInfo = undefined;
    try {
      undefined;
      return res.status(200).json(false);
    } catch (error) {
      return res.status(200).json(true);
    }
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
