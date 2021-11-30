import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-celo/lib';
import {newKit} from '@celo/contractkit';

type ResponseT = {
  attoCELO: string;
  attoUSD: string;
  attoEUR: string;
};
export default async function balance(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const {address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    const goldtoken = undefined;
    const celoBalance = undefined;

    const stabletokenUSD = undefined;
    const cUSDBalance = undefined;

    const stabletokenEUR = undefined;
    const cEURBalance = undefined;

    res.status(200).json({
      attoCELO: celoBalance.toString(),
      attoUSD: cUSDBalance.toString(),
      attoEUR: cEURBalance.toString(),
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
