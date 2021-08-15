import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { validateChain, b58decode } from "@taquito/utils";

import { getTezosUrl } from "@tezos/lib";

export default async function connect(
  _req: NextApiRequest, 
  res: NextApiResponse<string | boolean>
) {
  try {
    const url = getTezosUrl();
    console.log(url)
    const toolkit = new TezosToolkit(url);
    const chainId = await toolkit.rpc.getChainId()
    console.log(chainId, b58decode(chainId))
    if (validateChain(chainId) != 3) {
      throw Error('invalid chain Id')
    }
    res.status(200).json(chainId);
  } catch (error) {
    console.log(error)
    res.status(500).json('Connection to florencenet failed');
  }
}
