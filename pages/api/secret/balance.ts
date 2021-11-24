import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
import {CosmWasmClient} from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string | string>,
) {
  try {
    const url = getNodeUrl();
    const {address} = req.body;
    console.log('url:', url);
    console.log('address:', address);
    const client = new CosmWasmClient(url);
    console.log(client);

    const account = await client.getAccount(address);
    console.log(account);

    const balance = account?.balance[0].amount as string;
    console.log(balance);
    res.status(200).json(balance);
  } catch (error) {
    console.log(error);
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
