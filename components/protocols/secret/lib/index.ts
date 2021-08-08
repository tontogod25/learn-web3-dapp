import { SECRET_NETWORKS } from "types/types"

export const getDataHubSecretNodeUrl = (network: SECRET_NETWORKS): string => 
    network === SECRET_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_SECRET_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
        : `https://${process.env.DATAHUB_SECRET_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
