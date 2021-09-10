import type {NextApiRequest, NextApiResponse} from 'next';
import {getSafeUrl} from '@ccelo/lib';
import {newKit} from '@celo/contractkit';

type ResponseT = {
  attoCELO: string;
  attoUSD: string;
};
export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const {address} = req.body;
    const url = getSafeUrl();
    const kit = newKit(url);

    const goldtoken = undefined;
    const celoBalance = undefined;

    const stabletoken = undefined;
    const cUSDBalance = undefined;

    res.status(200).json({
      attoCELO: celoBalance.toString(),
      attoUSD: cUSDBalance.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('Querying of balance failed');
  }
}
