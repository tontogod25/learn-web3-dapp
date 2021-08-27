import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

type ResponseT = {
    address: string
    hash: string
}

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>
) {
    try {
        const { secret, address } = req.body
        const url = getSafeUrl();
        const kit = newKit(url);

        kit.addAccount(secret);

        let tx = await kit.sendTransaction({
            from: address,
            data: HelloWorld.bytecode
        })
        const receipt = await tx.waitReceipt()

        res.status(200).json({
            address: receipt?.contractAddress as string,
            hash: receipt.transactionHash
        })
    } catch(error) {
        console.error(error)
        res.status(500).json('Deployment of contract failed')
    }
}
