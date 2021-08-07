import { CELO_NETWORKS } from "types/types"
  
const getDataHubCeloNodeUrl = (network: CELO_NETWORKS): string => 
    network === CELO_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_CELO_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_CELO_API_KEY}/`
        : `https://${process.env.DATAHUB_CELO_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_CELO_API_KEY}/`
  