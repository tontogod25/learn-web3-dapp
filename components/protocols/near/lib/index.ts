import {InMemoryKeyStore} from 'near-api-js/lib/key_stores';
import {keyStores, ConnectConfig, KeyPair} from 'near-api-js';

export const networkfromString = (network: string): NEAR_NETWORKS =>
  network === 'mainnet' ? NEAR_NETWORKS.MAINNET : NEAR_NETWORKS.TESTNET;

export const networkfromEnum = (network: NEAR_NETWORKS): string =>
  network === NEAR_NETWORKS.MAINNET ? 'mainnet' : 'testnet';

export enum NEAR_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

const getDataHubNearNodeUrl = (network = NEAR_NETWORKS.TESTNET): string =>
  network === NEAR_NETWORKS.MAINNET
    ? `https://${process.env.DATAHUB_NEAR_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_NEAR_API_KEY}`
    : `https://${process.env.DATAHUB_NEAR_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_NEAR_API_KEY}`;

export const getSafeEnv = (): string =>
  process.env.NEAR_NETWORK ? process.env.NEAR_NETWORK : 'testnet';

export const getSafeUrl = (force = true): string =>
  force ? getDataHubNearNodeUrl() : 'https://rpc.testnet.near.org';

export const configFromNetwork = (networkId: string): ConnectConfig => {
  const walletUrl: string = `https://wallet.${networkId}.near.org`;
  const helperUrl: string = `https://helper.${networkId}.near.org`;
  const nodeUrl: string = getDataHubNearNodeUrl(networkfromString(networkId));
  const keyStore: InMemoryKeyStore = new keyStores.InMemoryKeyStore();
  const config = {
    keyStore,
    networkId,
    nodeUrl,
    helperUrl,
    walletUrl,
  };
  return config;
};

export const getExplorerUrl = (network: string) =>
  `https://explorer.${network}.near.org`;

export const getTransactionUrl = (network: string) => (hash: string) =>
  `https://explorer.${network}.near.org/transactions/${hash}`;

export const getAccountUrl = (network: string) => (accountId: string) =>
  `https://explorer.${network}.near.org/accounts/${accountId}`;

export const getPrettyPublicKey = (secretKey: string) =>
  KeyPair.fromString(secretKey).getPublicKey().toString().slice(8);

export const getPublicKey = (secretKey: string) =>
  KeyPair.fromString(secretKey).getPublicKey().toString();
