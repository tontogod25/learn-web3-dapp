import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiPromise } from "@polkadot/api"
import { WsProvider } from "@polkadot/rpc-provider"

import { getDatahubNodeURL } from "utils/datahub-utils"
import { CHAINS, POLKADOT_NETWORKS, POLKADOT_PROTOCOLS } from "types/types"
import { PolkadotConnectReponse } from 'types/polkadot-types';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const url = getDatahubNodeURL(CHAINS.POLKADOT, POLKADOT_NETWORKS.WESTEND, POLKADOT_PROTOCOLS.WS)
  const httpProvider = new WsProvider(url)
  const api = await ApiPromise.create({ provider: httpProvider })
  const stuff = api.genesisHash.toHex()

  console.log(stuff);
  res.status(200).json(stuff)
}