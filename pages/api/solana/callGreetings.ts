import { Connection, PublicKey, Keypair, TransactionInstruction, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSafeUrl } from '@solana/lib';
import * as borsh from 'borsh';

// The state of a greeting account managed by the hello world program
class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

export default async function getGreetings(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const { greeter, secret, programId } = req.body;
    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed");

    const greeterPublicKey = new PublicKey(greeter);
    const programKey = new PublicKey(programId);

    const payerSecretKey = new Uint8Array(JSON.parse(secret));
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

    const instruction = new TransactionInstruction({
      keys: [{pubkey: greeterPublicKey as PublicKey, isSigner: false, isWritable: true}],
      programId: programKey,
      data: Buffer.alloc(0), // All instructions are hellos
    });


    const hash = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [payerKeypair]
    );

    res.status(200).json(hash);
  } catch(error) {
    console.error(error);
    res.status(500).json('Get balance failed');
  }
}
