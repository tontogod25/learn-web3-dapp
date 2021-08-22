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
    //... let's skip the beginning as it's should be familiar for you now.
    // The secret key is stored in our state as a stingified array
    const secretKey = Uint8Array.from(JSON.parse(secret as string));

    // Find the parameter to pass  
    const instructions = SystemProgram.transfer

    // How could you construct a signer array's
    const signers = 

    // Maybe adding someting to a Transaction could be interesting ?
    const transaction = new Transaction()

    const hash =// You should now what is expected here.
    res.status(200).json(hash);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
