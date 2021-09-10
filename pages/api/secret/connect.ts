import type {NextApiRequest, NextApiResponse} from 'next';
import {getSafeUrl} from 'components/protocols/secret/lib';
import {CosmWasmClient} from 'secretjs';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = await getSafeUrl();
    const client = undefined;
    const nodeInfo = undefined;
    const version = undefined;
    res.status(200).json(version);
  } catch (error) {
    console.log(error);
    res.status(500).json('Failed to connect to secret');
  }
}
