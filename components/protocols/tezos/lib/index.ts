export enum TEZOS_NETWORKS {
    MAINNET = "MAINNET",
    TESTNET = "TESTNET"
  }

export const getSafeEnv = (): string =>
    process.env.TEZOS_NETWORK
        ? process.env.TEZOS_NETWORK
        : "florencenet"
/*
export const getTezosUrl = (network: TEZOS_NETWORKS): string => 
    network === TEZOS_NETWORKS.MAINNET 
            ?  `https://${process.env.DATAHUB_TEZOS_TESTNET_URL}/apikey/${process.env.DATAHUB_TEZOS_API_KEY}`
            :  `wss://${process.env.DATAHUB_TEZOS_TESTNET_URL}/apikey/${process.env.DATAHUB_TEZOS_API_KEY}`
*/

export const getTezosUrl = (): string => 
    `https://${process.env.DATAHUB_TEZOS_TESTNET_URL}/apikey/${process.env.DATAHUB_TEZOS_API_KEY}`

export const officialUrl = 'https://api.tez.ie/rpc/florencenet'

export const getSafeUrl = (force: true) => 
  force ? officialUrl : getTezosUrl()

export const accountUrl = (address: string) => `https://florencenet.tzkt.io/${address}`

export const transactionUrl = (address: string) => `https://florencenet.tzkt.io/${address}`
