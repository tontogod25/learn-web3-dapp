import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const { secret, amount } = req.body
        const url = getSafeUrl();
        const kit = newKit(url);

        const account = kit.web3.eth.accounts.privateKeyToAccount(secret)

        kit.addAccount(account.privateKey);
        const recipientAddress = '0xD86518b29BB52a5DAC5991eACf09481CE4B0710d';

        const celoToken = await kit.contracts.getGoldToken();
        const celotx = await celoToken
            .transfer(recipientAddress, amount)
            .send({from: account.address})

        const celoReceipt = await celotx.waitReceipt();
        console.log(celoReceipt.transactionHash)

        res.status(200).json(celoReceipt.transactionHash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Transfer of CELO failed')
    }
}
