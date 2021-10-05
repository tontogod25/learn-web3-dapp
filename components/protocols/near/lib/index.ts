import {keyStores, ConnectConfig, KeyPair} from 'near-api-js';
import {CHAINS, NEAR_NETWORKS, NEAR_PROTOCOLS} from 'types';
import {InMemoryKeyStore} from 'near-api-js/lib/key_stores';
import {getNodeURL} from 'utils/datahub';

export const configFromNetwork = (network: string): ConnectConfig => {
  const nodeUrl: string = getNodeURL(
    CHAINS.NEAR,
    NEAR_NETWORKS.TESTNET,
    NEAR_PROTOCOLS.RPC,
    network,
  );
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

export const getExplorerUrl = () => `https://explorer.testnet.near.org`;

export const getTransactionUrl = (hash: string) =>
  `https://explorer.testnet.near.org/transactions/${hash}`;

export const getAccountUrl = (accountId: string) =>
  `https://explorer.testnet.near.org/accounts/${accountId}`;

export const getPrettyPublicKey = (secretKey: string) =>
  KeyPair.fromString(secretKey).getPublicKey().toString().slice(8);

export const getPublicKey = (secretKey: string) =>
  KeyPair.fromString(secretKey).getPublicKey().toString();
