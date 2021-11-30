import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-celo/lib';
import {newKit} from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {contract, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    // Create a new contract instance with the HelloWorld contract info
    const instance = undefined;
    // Call the getName function of the on-chain contract
    const name = undefined;

    res.status(200).json(name);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
