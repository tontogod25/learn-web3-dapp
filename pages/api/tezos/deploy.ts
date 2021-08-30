import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";
import { importKey } from '@taquito/signer';
import { CONTRACT_JSON } from 'contracts/tezos/counter.js';

type ResponseT = {
  contractAddress: string
  hash: string
}
export default async function deploy(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseT | string>
) {
  try {
    const { mnemonic, email, password, secret, amount } = req.body
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(
      tezos,
      email,
      password,
      mnemonic,
      secret
    )

    const operation = await tezos.contract.originate({
      code: CONTRACT_JSON,
      storage: 0
    })

    const contract = await operation.contract()
 
    res.status(200).json({
      contractAddress: contract.address,
      hash: operation.hash
    });
  } catch (error) {
    console.log(error)
    res.status(500).json('Balance retrieving failed');
  }
}
