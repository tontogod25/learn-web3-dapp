import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiPromise } from "@polkadot/api"
import { WsProvider } from "@polkadot/rpc-provider"

import { getDataHubPolkadotNodeUrl } from "@polka/lib"
import { POLKADOT_NETWORKS, POLKADOT_PROTOCOLS } from "types/types"
import { PolkadotConnectResponse, PolkadotConnectErrorResponse } from '@polka/types';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<PolkadotConnectResponse | PolkadotConnectErrorResponse>
) {
  try {
    const url = getDataHubPolkadotNodeUrl(POLKADOT_NETWORKS.MAINNET, POLKADOT_PROTOCOLS.WS)
    const httpProvider = new WsProvider(url)
    const api = await ApiPromise.create({ provider: httpProvider })  
    const version = api.libraryInfo
    res.status(200).json(version)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    })
  }
}