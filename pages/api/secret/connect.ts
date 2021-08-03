import type { NextApiRequest, NextApiResponse } from 'next'
import { CHAINS, SECRET_NETWORKS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';
import { CosmWasmClient } from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const url = getDatahubNodeURL(CHAINS.SECRET, SECRET_NETWORKS.TESTNET)
        console.log(url)
        const client = new CosmWasmClient(url)
        const nodeInfo = await client.restClient.nodeInfo();
        const version = nodeInfo.application_version.version;
        console.log(version)
        res.status(200).json(version)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
}
