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
    const value = await tezos.contract.getStorage(contractAddress)
    console.log(value)
    // @ts-ignore
    const val = value.toString()

    res.status(200).json(val);
  } catch (error) {
    console.log(error)
    res.status(500).json('Balance retrieving failed');
  }
}
