import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'

import { PolygonQueryResponse, PolygonQueryErrorResponse } from 'types/polygon-types'
import { CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from 'types/types'
import { getDatahubNodeURL } from 'utils/datahub-utils'

export default async function query(
  req: NextApiRequest,
  res: NextApiResponse<PolygonQueryResponse | PolygonQueryErrorResponse>
) {
    const url = getDatahubNodeURL(CHAINS.POLYGON, POLYGON_NETWORKS.TESTNET, POLYGON_PROTOCOLS.JSON_RPC)
    const provider = new ethers.providers.JsonRpcProvider(url, "any")

    try {
      // TODO(rx)
      // const chainId = await signer.getChainId()
      // const blockHeight = await provider.getBlockNumber()
      // const gasPriceAsGwei = await provider.getGasPrice().then(res => { return ethers.utils.formatUnits(res, "gwei") })
      // const blockInfo = await provider.getBlockWithTransactions(blockHeight)

      const chainName = await provider.getNetwork().then(res => { return res.name })
      const chainId = 0
      const blockHeight = 0
      const gasPriceAsGwei = ""
      const blockInfo = ""

      res
        .status(200)
        .json({
          chainName,
          chainId,
          blockHeight,
          gasPriceAsGwei,
          blockInfo
        });
    } catch(err) {
      res
        .status(500)
        .json({
          message: err.message
        });
    }
}
