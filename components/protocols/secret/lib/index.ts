import { SECRET_NETWORKS } from "types/types"
import { CosmWasmClient } from 'secretjs';

/*
SECRET_REST_URL='https://chainofsecrets.secrettestnet.io/'
SECRET_RPC_URL='https://chainofsecrets.secrettestnet.io:26657/'
SECRET_WS_URL='wss://chainofsecrets.secrettestnet.io:26657/websocket'
SECRET_CHAIN_ID='holodeck-2'

MNEMONIC='<YOUR SECRET MNEMONIC>'
ADDRESS='<YOUR ACCOUNT ADDRESS>'
*/

export const getDataHubSecretNodeUrl = (network: SECRET_NETWORKS): string => {
    console.log(network)
    console.log(process.env.DATAHUB_SECRET_TESTNET_RPC_URL)
    return network === SECRET_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_SECRET_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
        : `https://${process.env.DATAHUB_SECRET_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
}

export const getSafeUrl = ()  => {
    return 'https://chainofsecrets.secrettestnet.io/'
}

export const getSafeClient = async (): Promise<CosmWasmClient> => {
    try {
        const url = getDataHubSecretNodeUrl(SECRET_NETWORKS.TESTNET)
        const client = new CosmWasmClient(url)
        console.log('connected to testnet figment DATAHUB')
        return client;
    } catch(err) {
        const url = getSafeUrl()
        console.log('connected to testnet secret network')
        const client = new CosmWasmClient(url)
        return client
    } 
}
