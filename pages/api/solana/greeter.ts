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
export default async function greeter(
  req: NextApiRequest,
  res: NextApiResponse<string | ResponseT>
) {
  try {
    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed");

    const programId = new PublicKey(req.body.programId as string);
    const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(req.body.secret as string)));

    const GREETING_SEED = 'hello';

    // Is there any methods from PublicKey allowing to derive a pub's key from a seed ?
    const greetedPubkey = await PublicKey.undefined  

    // This function allow to calculate how many fees one have to pay to keep the newly 
    // created account alive on the blockchain.
    const lamports = await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

    // Find which method are expected and fill with the required arguements.
    const transaction = new Transaction().add(
        SystemProgram.undefined
    );
    
    // complete with the expected arguments 
    const hash = await sendAndConfirmTransaction(undefined)
    res.status(200).json({
        hash: hash, 
        greeter: greetedPubkey.toBase58()
    });
  } catch(error) {
    console.error(error);
    res.status(500).json('Get balance failed');
  }
}
