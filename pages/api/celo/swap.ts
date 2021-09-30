import type {NextApiRequest, NextApiResponse} from 'next';
import {getSafeUrl} from '@celo/lib';
import {newKit} from '@celo/contractkit';

type ResponseT = {
  celo: string;
  hash: string;
};
export default async function swap(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const {secret, address} = req.body;
    const OneCUSD = '1000000000000000000';

    const url = getSafeUrl();
    const kit = newKit(url);
    kit.addAccount(secret);

    // Get contract wrappers
    // - StableTokenWrapper
    // - ExchangeWrapper
    const stableToken = undefined;
    const exchange = undefined;

    // Approve a user to transfer StableToken on behalf of another user.
    const approveTx = undefined;

    // Exchange cUSD for CELO
    const goldAmount = undefined;
    const sellTx = undefined;

    const sellReceipt = await sellTx.waitReceipt();
    res.status(200).json({
      celo: goldAmount.toString(),
      hash: sellReceipt.transactionHash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('Token Exchange failed');
  }
}
