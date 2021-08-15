import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";
import { importKey } from '@taquito/signer';

export default async function connect(
  req: NextApiRequest, 
  res: NextApiResponse<string>
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
    const recipeint = 'tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY';
    const operation = await tezos.contract
      .transfer({ to: recipeint, amount: amount })
    
    console.log(`Waiting for ${operation.hash} to be confirmed...`);
    await operation.confirmation(1) 

    res.status(200).json(operation.hash);
  } catch (error) {
    console.log(error)
    res.status(500).json('Balance retrieving failed');
  }
}
