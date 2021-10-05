import {SECRET_NETWORKS} from 'types';
import {getSafeUrl} from 'components/protocols/secret/lib';
import {
  EnigmaUtils,
  SigningCosmWasmClient,
  CosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';
import {Bip39, Random} from '@iov/crypto';
import dotenv from 'dotenv';

import {SCRT_AMOUNT} from '__mocks__/secretfaucet';

dotenv.config({path: '.env.local'});

// Avoid jest open handle error
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});

async function connection_step() {
  const url = await getSafeUrl();
  const connection = new CosmWasmClient(url);
  const nodeInfo = await connection.restClient.nodeInfo();
  const version = nodeInfo.application_version.version;
  return version.slice(0, 5);
}

async function keypair_step() {
  const mnemonic = Bip39.encode(Random.getBytes(16)).toString();
  const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
  const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
  const address = pubkeyToAddress(pubkey, 'secret');
  return address;
}

async function fund_step() {
  // TODO: Properly mock a faucet
  return SCRT_AMOUNT;
}

async function balance_step(address: string) {
  const url = await getSafeUrl(true);
  const connection = new CosmWasmClient(url);
  const account = await connection.getAccount(address);
  const balance = account?.balance[0].amount as string;
  console.log(`Balance of ${address}: `, balance);
  return balance;
}

async function transfer_step() {
  const url = await getSafeUrl();
  const signingPenUnfunded = await Secp256k1Pen.fromMnemonic(
    'exercise champion boss future sibling canvas dentist soup panel skull sight frown',
  ); // This account has not been funded
  const signingPenFunded = await Secp256k1Pen.fromMnemonic(
    'various random balcony vintage choose tank keep future bullet frozen brisk razor',
  ); // This account has been funded
  const pubkeyFunded = encodeSecp256k1Pubkey(signingPenFunded.pubkey);
  const pubkeyUnfunded = encodeSecp256k1Pubkey(signingPenUnfunded.pubkey);
  const senderAddress = pubkeyToAddress(pubkeyFunded, 'secret'); // secret1cg08scme4n500c2a8ufh0d645xjuprlvmlm2ar
  const receiverAddress = pubkeyToAddress(pubkeyUnfunded, 'secret'); // secret1n36dm5qfzefwdgfdyjgcemlzcjrcz4yfg98fkm
  const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
  const txAmount = '100000';
  const fees = {
    send: {
      amount: [{amount: '80000', denom: 'uscrt'}],
      gas: '80000',
    },
  };
  const client = new SigningCosmWasmClient(
    url,
    senderAddress,
    (signBytes) => signingPenFunded.sign(signBytes),
    txEncryptionSeed,
    fees,
  );
  const memo = 'sendTokens example'; // Optional memo
  const sent = await client.sendTokens(
    receiverAddress,
    [
      {
        amount: txAmount,
        denom: 'uscrt',
      },
    ],
    memo,
  );
  console.log(`${sent} - ${senderAddress} to ${receiverAddress}`);
  return sent;
}

describe('Secret backend tests', () => {
  // Avoid jest open handle error
  jest.setTimeout(30000);

  test('Connection step', async () => {
    await expect(connection_step()).resolves.toBe('1.0.4');
  });

  test('Keypair step', async () => {
    await expect(keypair_step()).resolves.toHaveLength(45);
  });

  test('Fund step', async () => {
    await expect(fund_step()).resolves.toBeDefined();
  });

  // This worked previously but now rejects with: [Error: Unsupported Pubkey type. Amino prefix: eb5ae98721]
  test('Balance step', async () => {
    await expect(
      balance_step('secret1cg08scme4n500c2a8ufh0d645xjuprlvmlm2ar'),
    ).resolves.toBeDefined();
  });

  test('Transfer step', async () => {
    await expect(transfer_step()).resolves.toBeDefined();
  });

  test('BalanceAfter step', async () => {
    await expect(
      balance_step('secret1n36dm5qfzefwdgfdyjgcemlzcjrcz4yfg98fkm'),
    ).resolves.toBeDefined();
  });
});
