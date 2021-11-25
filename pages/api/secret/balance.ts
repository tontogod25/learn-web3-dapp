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
    const client = new CosmWasmClient(url);

    // Query the Account object
    const account = undefined;
    // Return the balance
    const balance = undefined;

    res.status(200).json(balance);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
