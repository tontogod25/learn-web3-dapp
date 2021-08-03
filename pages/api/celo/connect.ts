import type { NextApiRequest, NextApiResponse } from 'next'
import { CHAINS, CELO_NETWORKS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';
import { newKit } from '@celo/contractkit';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const url = getDatahubNodeURL(CHAINS.CELO, CELO_NETWORKS.ALFAJORES)
        const kit = newKit(url);
        const version = await kit.web3.eth.getNodeInfo();
        res.status(200).json(version)
    } catch(error) {
        console.error(error)
        res.status(500).json('connection failed')
    }
}
