import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiPromise } from "@polkadot/api"
import { WsProvider } from "@polkadot/rpc-provider"

import { getDatahubNodeURL } from "utils/datahub-utils"
import { CHAINS, POLKADOT_NETWORKS, POLKADOT_PROTOCOLS } from "types/types"
import { PolkadotConnectResponse, PolkadotConnectErrorResponse } from 'types/polkadot-types';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<PolkadotConnectResponse | PolkadotConnectErrorResponse>
) {
  const url = getDatahubNodeURL(CHAINS.POLKADOT, POLKADOT_NETWORKS.MAINNET, POLKADOT_PROTOCOLS.WS)
  const httpProvider = new WsProvider(url)
  const api = await ApiPromise.create({ provider: httpProvider })

  try {
    const version = await api.libraryInfo
    res.status(200).json(version)
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    })
  }
}