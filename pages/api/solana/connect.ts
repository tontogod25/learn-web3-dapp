import { Connection } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next'

import { SolanaConnectReponse } from 'types/solana-types';
import { CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';

export default function connect(
  req: NextApiRequest,
  res: NextApiResponse<SolanaConnectReponse>
) {
  const url = getDatahubNodeURL(CHAINS.SOLANA, SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC)
  const connection = new Connection(url);

  connection.getVersion()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
