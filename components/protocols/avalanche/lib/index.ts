import { Avalanche } from 'avalanche';
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';

export const getAvalancheClient = () => {
  const url = new URL(process.env.DATAHUB_AVALANCHE_FUJI_RPC_URL as string)

  const client = new Avalanche(
    url.hostname,
    parseInt(url.port),
    url.protocol.replace(":", ""),
    parseInt(process.env.AVALANCHE_NETWORK_ID as string),
    "X",
    "C",
    process.env.AVALANCHE_NETWORK_NAME
  )

  // Apply DataHub API authentication token
  client.setAuthToken(process.env.DATAHUB_AVALANCHE_API_KEY as string)

  return client
}

export const getAvalancheExplorerURL = (txId: string) => {
  return `https://explorer.avax-test.network/tx/${txId}`
}

export const getDataHubAvalancheNodeUrl = (network: AVALANCHE_NETWORKS): string => 
    network === AVALANCHE_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_AVALANCHE_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`
        : `https://${process.env.DATAHUB_AVALANCHE_FUJI_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`
