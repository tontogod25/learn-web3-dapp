import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { getTezosUrl } from "@tezos/lib";

export default async function connect(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    const url = getTezosUrl();
    console.log(url)
    const toolkit = new TezosToolkit(url);
    const chainId = await toolkit.rpc.getChainId()
    console.log(chainId)
    res.status(200).json(true);
  } catch (error) {
    console.log(error)
    res.status(500).json(false);
  }
}
