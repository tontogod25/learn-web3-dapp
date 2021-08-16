import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";
import { importKey } from '@taquito/signer';
import { CONTRACT_JSON } from 'contracts/tezos/counter.js';

export default async function connect(
  req: NextApiRequest, 
  res: NextApiResponse<string>
) {
  try {
    const { mnemonic, email, password, secret, contractAddress } = req.body
    console.log(CONTRACT_JSON)
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(
      tezos,
      email,
      password,
      mnemonic,
      secret
    )
    
    const i = 1;
    const contract = await tezos.contract.at(contractAddress)
    const transaction = await contract.methods.increment(i).send()
    await transaction.confirmation(3)

    res.status(200).json(transaction.hash);
  } catch (error) {
    console.log(error)
    res.status(500).json('Balance retrieving failed');
  }
}
