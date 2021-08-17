import { SOLANA_NETWORKS, SOLANA_PROTOCOLS } from "types/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSolanaUrl } from "@solana/lib";
import { Connection } from "@solana/web3.js";

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const url = getSolanaUrl(SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC);
    console.log(url);
    const connection = new Connection(url);
    const version = await connection.getVersion();
    res.status(200).json(version?.["solana-core"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
