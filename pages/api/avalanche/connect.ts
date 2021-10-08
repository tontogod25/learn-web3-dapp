import type {NextApiRequest, NextApiResponse} from 'next';
import {getAvalancheClient} from '@avalanche/lib';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network} = req.body;
    const client = getAvalancheClient(network);
    const info = client.Info();
    const version = await info.getNodeVersion();
    if (version === undefined) {
      throw new Error('Connection failed: Complete the code');
    }
    res.status(200).json(version);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
