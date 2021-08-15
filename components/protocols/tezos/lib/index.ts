// Tezos
export enum TEZOS_NETWORKS {
    MAINNET = "MAINNET",
    TESTNET = "TESTNET"
  }

  /*
// Helper for generating an account URL on Solana Explorer
export const getAccountExplorerURL = (address: string) => {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}
  
// Helper for generating a transaction URL on Solana Explorer
export const getTxExplorerURL = (signature: string) => {
    return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}
*/

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

// export const getSafeUrl = () => "https://tezos--rpc--florencenet--full.datahub.figment.io/apikey
// https://api.tez.ie/rpc/florencenet
