import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const { contract } = req.body;
        const url = getSafeUrl();
        const kit = newKit(url);
        
        // Create a new contract instance with the HelloWorld contract info
        const instance = undefined;
        // Call the getName function of the on-chain contract
        const name = undefined;
    
        res.status(200).json(name);
      } catch(error) {
        console.error(error)
        res.status(500).json('read message from contract failed')
    }
}
