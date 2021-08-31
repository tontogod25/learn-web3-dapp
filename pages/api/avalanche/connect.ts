import type { NextApiRequest, NextApiResponse } from "next";
import { getAvalancheClient } from "@avalanche/lib";

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const client = undefined;
    const info = undefined;
    const version = undefined;
    res.status(200).json(version);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error connecting to Avalanche");
  }
}
