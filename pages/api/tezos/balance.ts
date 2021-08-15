import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";

export default async function connect(
  req: NextApiRequest, 
  res: NextApiResponse<string>
) {
  try {
    const { address } = req.body
    console.log(address)
    const url = getTezosUrl();
    // const url = 'https://api.tez.ie/rpc/florencenet'
    const toolkit = new TezosToolkit(url);
    const balance = await toolkit.tz.getBalance(address)
    console.log(balance)
    res.status(200).json(balance.toString());
  } catch (error) {
    console.log(error)
    res.status(500).json('Balance retrieving failed');
  }
}
