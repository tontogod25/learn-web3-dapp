import type {NextApiRequest, NextApiResponse} from 'next';
import {getAvalancheClient} from '@avalanche/lib';

type ReponseT = {
  secret: string;
  address: string;
};
export default function account(
  _req: NextApiRequest,
  res: NextApiResponse<ReponseT>,
) {
  const client = getAvalancheClient();
  const chain = client.XChain();
  const keyChain = chain.keyChain();
  const keypair = keyChain.undefined; // There is a useful method to use here
  const secret = undefined;
  const address = undefined;
  res.status(200).json({
    secret,
    address,
  });
}
