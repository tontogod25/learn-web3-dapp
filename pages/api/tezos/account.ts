import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from '@taquito/signer';
import { getTezosUrl } from "@tezos/lib";

export default async function connect(
  req: NextApiRequest, 
  res: NextApiResponse<string>
) {
  try {
    const { mnemonic, address, email, password, secret } = req.body
    console.log(mnemonic)
    console.log(address)
    console.log(email)
    console.log(password)
    console.log(secret)

    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(
        tezos,
        email,
        password,
        mnemonic,
        secret
      )

    res.status(200).json('ok');
  } catch (error) {
    console.log('error', error)
    res.status(500).json('Connection to florencenet failed');
  }
}
