import {getNodeURL} from 'components/protocols/solana/lib';
import {
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from '@solana/web3.js';
import path from 'path';
import fs from 'mz/fs';
import dotenv from 'dotenv';
import * as borsh from 'borsh';

dotenv.config({path: '.env.local'});

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

const PROGRAM_PATH = path.resolve('dist/solana/program');
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'helloworld.so');
const SECRET_PATH = path.resolve('dist/solana/program');
const SECRET_JSON_PATH = path.join(SECRET_PATH, 'helloworld-keypair.json');

async function createKeypairFromFile(filePath: string): Promise<Keypair> {
  const secretKeyString = await fs.readFile(filePath, {encoding: 'utf8'});
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

const getGreeterPublicKey = async (secret: string) => {
  const programId = (await createKeypairFromFile(SECRET_JSON_PATH)).publicKey;

  const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(secret)));
  const GREETING_SEED = 'hello';

  const greetedPubkey = await PublicKey.createWithSeed(
    payer.publicKey,
    GREETING_SEED,
    programId,
  );

  return greetedPubkey;
};

// avoid jest open handle error
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});

// Connection step
async function connection_step(network: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const version = await connection.getVersion();
  return version;
}

async function fund_step(network: string, address: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const publicKey = new PublicKey(address);
  const hash = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(hash);
  return !!hash;
}

async function balance_step(network: string, address: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const publicKey = new PublicKey(address);
  const balance = await connection.getBalance(publicKey);
  return balance;
}

async function transfer_step(network: string, address: string, secret: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');

  const fromPubkey = new PublicKey(address);
  const toPubkey = new PublicKey(
    'CBQACgyxWq9ndXPvQ2SJLLAp6ukhgrZBi6okHWyPGVZC',
  );
  const lamports = 100 * 1000 * 1000;
  const secretKey = Uint8Array.from(JSON.parse(secret as string));

  const instructions = SystemProgram.transfer({
    fromPubkey,
    toPubkey,
    lamports,
  });

  const signers = [
    {
      publicKey: fromPubkey,
      secretKey,
    },
  ];
  const transaction = new Transaction().add(instructions);

  const hash = await sendAndConfirmTransaction(
    connection,
    transaction,
    signers,
  );

  return !!hash;
}

async function greeter_step(network: string, secret: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const programId = (await createKeypairFromFile(SECRET_JSON_PATH)).publicKey;

  const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(secret)));
  const GREETING_SEED = 'hello';

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
  return !!hash;
}

async function deploy_step(network: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const programId = await createKeypairFromFile(SECRET_JSON_PATH);

  const programInfo = await connection.getAccountInfo(programId.publicKey);

  if (programInfo === null) {
    if (fs.existsSync(PROGRAM_SO_PATH)) {
      throw new Error(
        'Program needs to be deployed with `solana program deploy`',
      );
    } else {
      throw new Error('Program needs to be built and deployed');
    }
  } else if (!programInfo.executable) {
    throw new Error(`Program is not executable`);
  }

  return true;
}

async function getter_step(network: string, secret: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const greeterPublicKey = await getGreeterPublicKey(secret);
  const accountInfo = await connection.getAccountInfo(greeterPublicKey);

  if (accountInfo === null) {
    throw new Error('Error: cannot find the greeted account');
  }

  const greeting = borsh.deserialize(
    GreetingSchema,
    GreetingAccount,
    accountInfo.data,
  );

  return greeting.counter;
}

async function setter_step(network: string, secret: string) {
  const url = getNodeURL(network);
  const connection = new Connection(url, 'confirmed');
  const programId = await createKeypairFromFile(SECRET_JSON_PATH);
  const greeterPublicKey = await getGreeterPublicKey(secret);

  const programKey = programId.publicKey;

  const payerSecretKey = new Uint8Array(JSON.parse(secret));
  const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

  const instruction = new TransactionInstruction({
    keys: [{pubkey: greeterPublicKey, isSigner: false, isWritable: true}],
    programId: programKey,
    data: Buffer.alloc(0), // All instructions are hellos
  });

  const hash = await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payerKeypair],
  );

  return !!hash;
}

describe('Solana backend tests', () => {
  // avoid jest open handle error
  jest.setTimeout(30000);
  const network = process.env.JEST_ENV_NETWORK ?? 'devnet';
  const keypair = Keypair.generate();
  const address = keypair?.publicKey.toString();
  const secret = JSON.stringify(Array.from(keypair?.secretKey));

  test('Connection step', async () => {
    await expect(connection_step(network)).resolves.toHaveProperty(
      'solana-core',
    );
  });
  test('Fund step', async () => {
    await expect(fund_step(network, address)).resolves.toBeTruthy();
  });
  test('Balance step', async () => {
    await expect(balance_step(network, address)).resolves.toBe(
      LAMPORTS_PER_SOL,
    );
  });
  test('Transfer step', async () => {
    await expect(transfer_step(network, address, secret)).resolves.toBeTruthy();
  });
  test('Deploy step', async () => {
    await expect(deploy_step(network)).resolves.toBeTruthy();
  });
  test('Greeter step', async () => {
    await expect(greeter_step(network, secret)).resolves.toBeTruthy();
  });
  test('Getter step', async () => {
    await expect(getter_step(network, secret)).resolves.toBeGreaterThanOrEqual(
      0,
    );
  });
  test('Setter step', async () => {
    await expect(setter_step(network, secret)).resolves.toBeTruthy();
  });
});
