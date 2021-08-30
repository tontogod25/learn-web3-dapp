import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";

export default async function balance(
  req: NextApiRequest, 
  res: NextApiResponse<string>
) {
  try {
    const { address } = req.body
    const url = getTezosUrl();
    const toolkit = new TezosToolkit(url);
    const balance = await toolkit.tz.getBalance(address)
    res.status(200).json(balance.toString());
  } catch (error) {
    console.log(error)
    res.status(500).json('Balance retrieving failed');
  }
}
