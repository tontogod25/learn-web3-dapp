import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";
import { importKey } from '@taquito/signer';
import { CONTRACT_JSON } from 'contracts/tezos/counter.js';

export default async function setter(
  req: NextApiRequest, 
  res: NextApiResponse<string>
) {
  try {
    const { mnemonic, email, password, secret, contract } = req.body
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);
    await importKey(
      tezos,
      email,
      password,
      mnemonic,
      secret
    )
    
    const n = 1;
    const counterContract = await tezos.contract.at(contract)
    const transaction = await counterContract.methods.increment(n).send();

    await transaction.confirmation(3)

    res.status(200).json(transaction.hash);
  } catch (error) {
    console.log(error)
    res.status(500).json("Setting of contract's storage failed");
  }
}
