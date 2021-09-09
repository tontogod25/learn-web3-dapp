import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from 'utils/datahub-utils';
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
  hash: string;
  greeter: string;
};
export default async function greeter(
  req: NextApiRequest,
  res: NextApiResponse<string | ResponseT>,
) {
  try {
    const {network, secret, programId: programAddress} = req.body;
    const url = getNodeURL(
      CHAINS.SOLANA,
      SOLANA_NETWORKS.DEVNET,
      SOLANA_PROTOCOLS.RPC,
      network,
    );
    const connection = new Connection(url, 'confirmed');

    const programId = new PublicKey(programAddress as string);
    const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(secret)));
    const GREETING_SEED = 'hello';

    // Is there any methods from PublicKey allowing to derive a pub's key from a seed ?
    const greetedPubkey = await PublicKey.createWithSeed(
      payer.publicKey,
      GREETING_SEED,
      programId,
    );

    const lamports = await connection.getMinimumBalanceForRentExemption(
      GREETING_SIZE,
    );

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
    const hash = await sendAndConfirmTransaction(connection, transaction, [
      payer,
    ]);
    res.status(200).json({
      hash: hash,
      greeter: greetedPubkey.toBase58(),
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
