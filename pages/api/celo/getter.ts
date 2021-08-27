import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const { contract } = req.body

        const url = getSafeUrl();
        const kit = newKit(url);
        
        // Create a new contract instance with the HelloWorld contract info
        const instance = new kit.web3.eth.Contract(
            // @ts-ignore
            HelloWorld.abi, 
            contract
        )

        const name = await instance.methods.getName().call()

        res.status(200).json(name)
} catch(error) {
        console.error(error)
        res.status(500).json('read message from contract failed')
    }
}