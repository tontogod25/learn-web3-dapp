import type { NextApiRequest, NextApiResponse } from "next";
import { getSafeUrl } from "@solana/lib";
import { Connection } from "@solana/web3.js";

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const url = getSafeUrl();
    const connection = undefined;
    const version = undefined;
    res.status(200).json(version?.["solana-core"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
