import type {NextApiRequest, NextApiResponse} from 'next';
import {getSafeUrl} from 'components/protocols/secret/lib';
import {CosmWasmClient} from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = await getSafeUrl();
    const {address} = req.body;
    const client = new CosmWasmClient(url);

    // Query the Account object
    const account = undefined;
    // Return the balance
    const balance = undefined;

    res.status(200).json(balance);
  } catch (error) {
    console.log(error);
    res.status(500).json('failed to connect to secret');
  }
}
