import { Avalanche } from 'avalanche';

export enum AVALANCHE_NETWORKS {
  MAINNET = "MAINNET",
  FUJI = "FUJI"
}

export const getAvalancheClient = () => {
  const url = new URL(getDataHubAvalancheNodeUrl(AVALANCHE_NETWORKS.FUJI))

  const client = new Avalanche(
    url.hostname,
    parseInt(url.port),
    url.protocol.replace(":", ""),
    parseInt(process.env.AVALANCHE_NETWORK_ID as string),
    "X",
    "C",
    process.env.AVALANCHE_NETWORK_NAME
  )

  client.setAuthToken(process.env.DATAHUB_AVALANCHE_API_KEY as string)

  return client
}

export const transactionUrl = (txId: string) => {
  return `https://explorer.avax-test.network/tx/${txId}`
}

export const getDataHubAvalancheNodeUrl = (network: AVALANCHE_NETWORKS): string => 
    network === AVALANCHE_NETWORKS.MAINNET
        ? `https://${process.env.DATAHUB_AVALANCHE_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`
        : `https://${process.env.DATAHUB_AVALANCHE_FUJI_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`
