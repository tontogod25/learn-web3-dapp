enum CELO_NETWORKS {
    MAINNET = "MAINNET",
    ALFAJORES = "alfajores"
  }

const getDataHubCeloNodeUrl = (network: CELO_NETWORKS): string => 
    network === CELO_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_CELO_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_CELO_API_KEY}/`
        : `https://${process.env.DATAHUB_CELO_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_CELO_API_KEY}/`
  
export const getSafeUrl = (hub = true) =>
    hub 
    ? getDataHubCeloNodeUrl(CELO_NETWORKS.ALFAJORES)
    : 'https://alfajores-forno.celo-testnet.org'

export const transactionUrl = (hash: string) => `https://alfajores-blockscout.celo-testnet.org/tx/${hash}`
