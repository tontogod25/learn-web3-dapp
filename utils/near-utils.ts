import { keyStores, ConnectConfig  } from "near-api-js";
import { CHAINS, NEAR_NETWORKS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';

const networkfromString = (network: string) : NEAR_NETWORKS => 
    network === "mainnet"
        ? NEAR_NETWORKS.MAINNET
        : NEAR_NETWORKS.TESTNET

const networkId = networkfromString(`${process.env.NEAR_NETWORK}`)

const getWalletUrl = (network: string) => `https://wallet.${network}.near.org`
const getHelperUrl = (network: string) => `https://helper.${network}.near.org`

export const getNearConfig = () => {
    const keyStore = new keyStores.InMemoryKeyStore();
    const nodeUrl = getDatahubNodeURL(CHAINS.NEAR, networkId)
    
    const config: ConnectConfig = {
        keyStore,
        nodeUrl,
        networkId,
        helperUrl: getHelperUrl(networkId),
    };

    return config;
}

export const getExplorerUrl = (network: string) =>
    `https://explorer.${network}.near.org`

export const getTransactionUrl = (network: string, hash: string) =>
    `https://explorer.${network}.near.org/transactions/${hash}`

export const getAccountUrl = (network: string, accountId: string) =>
    `https://explorer.${network}.near.org/transactions/${accountId}`
