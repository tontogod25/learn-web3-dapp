import {getAvalancheClient} from '@avalanche/lib';
import type {BalanceT} from '@avalanche/types';
import {BinTools, BN} from 'avalanche';
import {Address} from 'ethereumjs-util';
import dotenv from 'dotenv';

dotenv.config({path: '.env.local'});

async function connect_step(network: string) {
  const client = getAvalancheClient(network);
  const info = client.Info();
  const version = await info.getNodeVersion();
  return !!version;
}

async function account_step(network: string) {
  const client = getAvalancheClient(network);
  const chain = client.XChain();
  const keyChain = chain.keyChain();
  const keypair = keyChain.makeKey();
  const secret = keypair.getPrivateKeyString();
  const address = keypair.getAddressString();
  return !!secret && !!address;
}

async function balance_step(network: string, address: string) {
  const client = getAvalancheClient(network);
  const chain = client.XChain();
  const balance = (await chain.getBalance(address, 'AVAX')) as BalanceT;
  return !!balance.balance;
}

async function transfer_step(network: string, address: string, secret: string) {
  const recipient = 'X-fuji10f9gsh80unawkxdtug42475u2kq22sv8xryekd';
  const navax = '5000';
  const client = getAvalancheClient(network);
  const chain = client.XChain();
  const keychain = chain.keyChain();
  keychain.importKey(secret);

  const {utxos} = await chain.getUTXOs(address);
  const binTools = BinTools.getInstance();
  const assetInfo = await chain.getAssetDescription('AVAX');
  const assetID = binTools.cb58Encode(assetInfo.assetID);
  const transaction = await chain.buildBaseTx(
    utxos,
    new BN(navax),
    assetID,
    [recipient],
    [address],
    [address],
  );

  const signedTx = transaction.sign(keychain);
  const hash = await chain.issueTx(signedTx);
  return !!hash;
}

async function export_step(network: string, secret: string) {
  const client = getAvalancheClient(network);
  const amount = '5000000';

  const [xChain, cChain] = [client.XChain(), client.CChain()];
  const [xKeychain, cKeychain] = [xChain.keyChain(), cChain.keyChain()];
  const [xKeypair, cKeypair] = [
    xKeychain.importKey(secret),
    cKeychain.importKey(secret),
  ];
  const [xAddress, cAddress] = [
    xKeypair.getAddressString(),
    cKeypair.getAddressString(),
  ];

  const chainId = await client.Info().getBlockchainID('C');
  const {utxos} = await xChain.getUTXOs(xAddress);
  const exportTx = await xChain.buildExportTx(
    utxos,
    new BN(amount),
    chainId,
    [cAddress],
    [xAddress],
    [xAddress],
  );

  const hash = await xChain.issueTx(exportTx.sign(xKeychain));
  return !!hash;
}

async function import_step(network: string, secret: string) {
  const client = getAvalancheClient(network);

  const [xChain, cChain] = [client.XChain(), client.CChain()];
  const [xKeychain, cKeychain] = [xChain.keyChain(), cChain.keyChain()];
  const [xKeypair, cKeypair] = [
    xKeychain.importKey(secret),
    cKeychain.importKey(secret),
  ];
  const [cAddress] = [cKeypair.getAddressString()];

  const xChainId = await client.Info().getBlockchainID('X');
  const {utxos} = await cChain.getUTXOs(cAddress, xChainId);

  const binTools = BinTools.getInstance();
  const keyBuff = binTools.cb58Decode(secret.split('-')[1]);
  const ethAddr = Address.fromPrivateKey(
    Buffer.from(keyBuff.toString('hex'), 'hex'),
  ).toString();

  const importTx = await cChain.buildImportTx(
    utxos,
    ethAddr,
    [cAddress],
    xChainId,
    [cAddress],
  );

  const hash = await cChain.issueTx(importTx.sign(cKeychain));
  return !!hash;
}

describe('Avalanche backend tests', () => {
  jest.setTimeout(15000);
  const network = 'testnet';
  const address = 'X-fuji10f9gsh80unawkxdtug42475u2kq22sv8xryekd';
  const secret = 'PrivateKey-tAUiooXNYuUMFjmiVxbhfBMKUfPgxMC5z4MuYjzwoALXTEzcV';

  test('Connect step', async () => {
    await expect(connect_step(network)).resolves.toBeTruthy();
  });

  test('Account step', async () => {
    await expect(account_step(network)).resolves.toBeTruthy();
  });

  test('Balance step', async () => {
    await expect(balance_step(network, address)).resolves.toBeTruthy();
  });

  test('Transfer step', async () => {
    await expect(transfer_step(network, address, secret)).resolves.toBeTruthy();
  });

  test('Export step', async () => {
    // avoid uxtos issue
    await new Promise((r) => setTimeout(r, 2000));
    await expect(export_step(network, secret)).resolves.toBeTruthy();
  });

  test('Import step', async () => {
    // avoid uxtos issue
    await new Promise((r) => setTimeout(r, 2000));
    await expect(import_step(network, secret)).resolves.toBeTruthy();
  });
});
