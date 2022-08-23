import {keyStores, ConnectConfig, KeyPair} from 'near-api-js';
import {InMemoryKeyStore} from 'near-api-js/lib/key_stores';

export const configFromNetwork = (network: string): ConnectConfig => {
  const nodeUrl = 'https://rpc.testnet.near.org';
  const keyStore: InMemoryKeyStore = new keyStores.InMemoryKeyStore();
  const config = {
    keyStore,
    nodeUrl,
    networkId: 'testnet',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',
  };
  return config;
};

export const transactionUrl = (hash: string) =>
  `https://explorer.testnet.near.org/transactions/${hash}`;

export const accountExplorer = (network: string) => (address: string) =>
  `https://explorer.testnet.near.org/accounts/${address}`;

export const getPrettyPublicKey = (secretKey: string) =>
  KeyPair.fromString(secretKey).getPublicKey().toString().slice(8);

export const getPublicKey = (secretKey: string) =>
  KeyPair.fromString(secretKey).getPublicKey().toString();
