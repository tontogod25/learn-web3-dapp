import { Connection, PublicKey, PublicKeyInitData } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next'

import { SolanaFundReponse, SolanaTransferErrorResponse } from 'types/solana-types';
import { CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';

const AIRDROP_AMOUNT = 1000000000

export default function fund(
  req: NextApiRequest,
  res: NextApiResponse<SolanaFundReponse | SolanaTransferErrorResponse>
) {
  const url = process.env.SOLANA_DEVNET_URL as string
  const connection = new Connection(url)
  const address = new PublicKey(req.body.address as PublicKeyInitData)
  
  connection
    .requestAirdrop(address, AIRDROP_AMOUNT)
    .then(response => {
      console.log(`response`, response)
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      })
    })
}
