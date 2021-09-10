import type {NextApiRequest, NextApiResponse} from 'next';
import {getSafeUrl} from '@ccelo/lib';
import {newKit} from '@celo/contractkit';

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {secret, amount, recipient, address} = req.body;
    const url = getSafeUrl();
    const kit = newKit(url);

    // Restore account using your secret
    undefined;
    // Access CELO contract wrapper
    const celoToken = undefined;
    // Build the transaction and send
    const celotx = undefined;
    // Wait for confirmation of the transaction
    const celoReceipt = await celotx.waitReceipt();

    res.status(200).json(celoReceipt.transactionHash);
  } catch (error) {
    console.error(error);
    res.status(500).json('Transfer of CELO failed');
  }
}
