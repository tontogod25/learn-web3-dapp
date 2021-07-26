import type { NextApiRequest, NextApiResponse } from 'next'

import { ethers } from 'ethers'

import { PolygonQueryResponse } from "types/polygon-types"
import { getDatahubNodeURL } from 'utils/datahub-utils'
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from 'types/types'


export default async function query(
  req: NextApiRequest,
  res: NextApiResponse<PolygonQueryResponse>
) {
    const url = getDatahubNodeURL(CHAINS.POLYGON, POLYGON_NETWORKS.TESTNET, POLYGON_PROTOCOLS.JSON_RPC)
    const provider = new ethers.providers.JsonRpcProvider(url, "any")

    // TODO: Add query parameters
    const blockHeight = await provider.getBlockNumber();
    const chainId = provider.network.chainId
    const chainName = provider.network.name
    const blockInfo = await provider.getBlockWithTransactions(blockHeight)
    const getGasPrice = await provider.getGasPrice();
    const gasPriceAsGwei = ethers.utils.formatUnits(getGasPrice, "gwei")

    // Logs in an API page go to the Next.js development server console
    console.log(`Gas Price (in Gwei): ${ethers.utils.formatUnits(getGasPrice, "gwei")}`);
    console.log(blockInfo) 

	res.status(200)
        .json({
            chainName,
            chainId,
            blockHeight,
            gasPriceAsGwei
        });
}
