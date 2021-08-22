import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSafeUrl } from "@solana/lib";

type ParamT = {
    address: string
    secret: string
    recipient: string
    lamports: number
}
export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const { address, secret, recipient, lamports } = req.body as ParamT
    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed");

    const fromPubkey = new PublicKey(address as string);
    const toPubkey = new PublicKey(recipient as string);
    const secretKey = Uint8Array.from(JSON.parse(secret as string));
    
    const instructions = SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    });
    
    const signers = [
      {
        publicKey: fromPubkey,
        secretKey
      }
    ];
    
    const transaction = new Transaction().add(instructions);
    
    const hash = await sendAndConfirmTransaction(
      connection,
      transaction,
      signers,
    )

    res.status(200).json(hash);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
