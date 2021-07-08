import { Connection, PublicKey, PublicKeyInitData } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SolanaBalanceReponse, SolanaBalanceErrorResponse } from 'types/solana-types'
import { CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS } from 'types/types'
import { getDatahubNodeURL } from 'utils/datahub-utils'

export default function balance(
  req: NextApiRequest,
  res: NextApiResponse<SolanaBalanceReponse | SolanaBalanceErrorResponse>
) {
  const url = getDatahubNodeURL(CHAINS.SOLANA, SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC)
  const connection = new Connection(url)
  const address = new PublicKey(req.body.address as PublicKeyInitData)
  
  connection
    .getBalance(address)
    .then((balance) => {
      res.status(200).json(balance)
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message
      })
    })
}
