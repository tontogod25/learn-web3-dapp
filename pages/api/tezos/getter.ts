import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";
import { importKey } from '@taquito/signer';

export default async function getter(
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

    // use the contract module to get the storage
    const counter = undefined;

    // @ts-ignore
    res.status(200).json(counter.toString());
  } catch (error) {
    console.log(error)
    res.status(500).json("Fetching of contract's storage failed");
  }
}
