import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
import {CosmWasmClient} from 'secretjs';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = getNodeUrl();
    const client = new CosmWasmClient(url);
    const nodeInfo = await client.restClient.nodeInfo();
    const version = nodeInfo.application_version.version;
    res.status(200).json(version);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
