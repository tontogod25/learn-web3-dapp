import { SECRET_NETWORKS } from "types/types"
import { CosmWasmClient } from 'secretjs';

export const getDataHubSecretNodeUrl = (network: SECRET_NETWORKS): string => {
    console.log(network)
    console.log(process.env.DATAHUB_SECRET_TESTNET_RPC_URL)
    return network === SECRET_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_SECRET_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
        : `https://${process.env.DATAHUB_SECRET_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
}

/*
export const getSafeUrl = ()  => {
    return 'https://chainofsecrets.secrettestnet.io/'
}
*/

export const getSecretTestnetUrl = ()  => {
    return 'https://chainofsecrets.secrettestnet.io/'
}

export const getSafeUrl = async (force = true): Promise<string> => {
    if (force) return getSecretTestnetUrl()  
    const url = getDataHubSecretNodeUrl(SECRET_NETWORKS.TESTNET)
    const client = new CosmWasmClient(url)
    try {
        const nonce = await client.getChainId();
        console.log('connected to testnet figment DATAHUB')
        return url;
    } catch(err) {
        console.log('connected to secret testnet network')
        return getSecretTestnetUrl()
    } 
}
