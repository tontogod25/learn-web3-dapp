import { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
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

// The expected size of each greeting account.
const GREETING_SIZE = borsh.serialize(
  GreetingSchema,
  new GreetingAccount(),
).length;

type ResponseT = {
    hash: string
    greeter: string
}

export default async function getGreetings(
  req: NextApiRequest,
  res: NextApiResponse<string | ResponseT>
) {
  try {
    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed");

    const programId = new PublicKey(req.body.programId as string);
    const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(req.body.secret as string)));

    const GREETING_SEED = 'hello';

    const greetedPubkey = await PublicKey.createWithSeed(
      payer.publicKey,
      GREETING_SEED,
      programId,
    );

    const lamports = await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

    const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
            fromPubkey: payer.publicKey,
            basePubkey: payer.publicKey,
            seed: GREETING_SEED,
            newAccountPubkey: greetedPubkey,
            lamports,
            space: GREETING_SIZE,
            programId,
        }),
    );
    const hash = await sendAndConfirmTransaction(connection, transaction, [payer])
    console.log(greetedPubkey.toBase58())
    console.log(hash)

    res.status(200).json({
        hash: hash, 
        greeter: greetedPubkey.toBase58()
    });
  } catch(error) {
    console.error(error);
    res.status(500).json('Get balance failed');
  }
}
