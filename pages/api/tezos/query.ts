import type { NextApiRequest, NextApiResponse } from "next";
import { TezosToolkit } from "@taquito/taquito";
import { RpcClient } from "@taquito/rpc";

// const url = process.env.DATAHUB_TEZOS_MAINNET_RPC_URL as string;
const url = "https://mainnet-tezos.giganode.io";
const toolkit = new TezosToolkit(url);

export default async function query(req: NextApiRequest, res: NextApiResponse) {
  const client = new RpcClient(url);

  // 1. Get chain constants
  try {
    const response = await Promise.all([
      client.getConstants(),
      client.getBlock(),
    ]);

    res.status(200).json({
      constants: response[0],
      chainId: response[1].chain_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
