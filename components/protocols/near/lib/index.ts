import { InMemoryKeyStore } from 'near-api-js/lib/key_stores'
import { keyStores, ConnectConfig, KeyPair  } from 'near-api-js'
import { CHAINS, NEAR_NETWORKS } from 'types/types'
// import { getDatahubNodeURL } from 'utils/datahub-utils'

export const networkfromString = (network: string) : NEAR_NETWORKS => 
    network === "mainnet"
        ? NEAR_NETWORKS.MAINNET
        : NEAR_NETWORKS.TESTNET

export const networkfromEnum = (network: NEAR_NETWORKS) : string =>
    network === NEAR_NETWORKS.MAINNET
        ? "mainnet"
        : "testnet"

export const getSafeEnv = (): string =>
    process.env.NEAR_NETWORK
        ? process.env.NEAR_NETWORK
        : "testnet"

export const configFromNetworkId = (networkId: string) : ConnectConfig => {
    const walletUrl: string = `https://wallet.${networkId}.near.org`;
    const helperUrl: string = `https://helper.${networkId}.near.org`;
    // const nodeUrl: string = getDatahubNodeURL(CHAINS.NEAR, networkfromString(networkId));
    const nodeUrl: string = 'https://rpc.testnet.near.org';
    const keyStore: InMemoryKeyStore = new keyStores.InMemoryKeyStore();
    const config = {
        keyStore,
        networkId,
        nodeUrl,
        helperUrl,
        walletUrl,
    }
    return config;
}

export const getExplorerUrl = (network: string) =>
    `https://explorer.${network}.near.org`

export const getTransactionUrl = (network: string) => 
    (hash: string) => `https://explorer.${network}.near.org/transactions/${hash}`

export const getAccountUrl = (network: string) =>
    (accountId: string) => `https://explorer.${network}.near.org/accounts/${accountId}`

export const getPrettyPublicKey = (secretKey: string) =>
    KeyPair.fromString(secretKey)
        .getPublicKey()
        .toString()
        .slice(8)

export const getPublicKey = (secretKey: string) =>
    KeyPair.fromString(secretKey)
        .getPublicKey()
        .toString()
