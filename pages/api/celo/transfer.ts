import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const { secret, amount, recipient, address } = req.body
        const url = getSafeUrl();
        const kit = newKit(url);

        kit.addAccount(secret);
        const celoToken = await kit.contracts.getGoldToken();
        const celotx = await celoToken
            .transfer(recipient, amount)
            .send({from: address})

        const celoReceipt = await celotx.waitReceipt();

        res.status(200).json(celoReceipt.transactionHash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Transfer of CELO failed')
    }
}
