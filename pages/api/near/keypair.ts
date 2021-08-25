import type { NextApiRequest, NextApiResponse } from "next";
import { KeyPair } from "near-api-js";

export default function connection(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const keypair = KeyPair.fromRandom('ed25519');
    const secret = keypair.toString();
    return res.status(200).json(secret);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Keypair generation failed");
  }
}
