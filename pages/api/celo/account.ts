import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-celo/lib';
import {newKit} from '@celo/contractkit';

type ResponseT = {
  address: string;
  secret: string;
};
export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const {network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);
    const account = undefined;
    const address = undefined;
    const secret = undefined;

    res.status(200).json({
      address,
      secret,
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
