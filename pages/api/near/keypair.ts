import type {NextApiRequest, NextApiResponse} from 'next';
import {KeyPair} from 'near-api-js';

type ReponseT = {
  address: string;
  secret: string;
};

export default function connection(
  _req: NextApiRequest,
  res: NextApiResponse<ReponseT | string>,
) {
  try {
    const keypair = undefined;
    const secret = undefined;
    const address = undefined;
    if (!secret || !address) {
      throw new Error('Please complete the code.');
    }
    return res.status(200).json({address, secret});
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(500).json(errorMessage);
  }
}
