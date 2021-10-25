import {
  PolygonQueryResponse,
  PolygonQueryErrorResponse,
} from '@figment-polygon/types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from '@figment-polygon/lib';
import {ethers} from 'ethers';

export default async function query(
  _req: NextApiRequest,
  res: NextApiResponse<PolygonQueryResponse | PolygonQueryErrorResponse>,
) {
  const url = getNodeURL();
  const provider = new ethers.providers.JsonRpcProvider(url, 'any');

  try {
    const networkName = await provider.getNetwork().then((res) => {
      return res.name;
    });

    // TODO: Define the variables below
    const chainId = undefined;
    const blockHeight = undefined;
    const gasPriceAsGwei = undefined;
    const blockInfo = undefined;

    if (!chainId || !blockHeight || !gasPriceAsGwei || !blockInfo) {
      throw new Error('Please complete the code');
    }

    res.status(200).json({
      networkName,
      chainId,
      blockHeight,
      gasPriceAsGwei,
      blockInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
