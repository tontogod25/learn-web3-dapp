import type {NextApiRequest, NextApiResponse} from 'next';
import {getAvalancheClient} from '@figment-avalanche/lib';

type ReponseT = {
  secret: string;
  address: string;
};
export default function account(
  req: NextApiRequest,
  res: NextApiResponse<ReponseT>,
) {
  try {
    const {network} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const keyChain = chain.keyChain();
    const keypair = keyChain.undefined; // There is a useful method to use here
    const secret = undefined;
    const address = undefined;
    res.status(200).json({
      secret,
      address,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
