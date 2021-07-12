import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiPromise } from "@polkadot/api"
import { WsProvider } from "@polkadot/rpc-provider"

import { getDatahubNodeURL } from "utils/datahub-utils"
import { CHAINS, POLKADOT_NETWORKS, POLKADOT_PROTOCOLS } from "types/types"
import { PolkadotQueryResponse, PolkadotQueryErrorResponse } from 'types/polkadot-types';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<PolkadotQueryResponse | PolkadotQueryErrorResponse>
) {
  const url = getDatahubNodeURL(CHAINS.POLKADOT, POLKADOT_NETWORKS.MAINNET, POLKADOT_PROTOCOLS.WS)
  const httpProvider = new WsProvider(url)
  const api = await ApiPromise.create({ provider: httpProvider })

  try {
    const [
      genesisHash,
      libVersion,
      chain,
      nodeName,
      nodeVersion,
      lastHeaderNumber,
      lastHeaderHash,
    ] = await Promise.all([
      api.genesisHash.toHex(),
      api.libraryInfo,
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      api.rpc.chain.getHeader(),
      api.rpc.chain.getBlockHash(),
    ]);
  
    res.status(200).json({
      genesisHash: genesisHash.toString(),
      libVersion,
      chain: chain.toString(),
      nodeName: nodeName.toString(),
      nodeVersion: nodeVersion.toString(),
      lastHeaderNumber: lastHeaderNumber.toString(),
      lastHeaderHash: lastHeaderHash.toString(),
    }) 
  } catch(err) {
    res.status(500).json({
      message: "Something went wrong"
    })
  }
}