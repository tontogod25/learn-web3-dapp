import {
  NETWORKS,
  PROTOCOLS,
  CHAINS,
  AVALANCHE_NETWORKS,
  POLYGON_NETWORKS,
  POLYGON_PROTOCOLS
} from "types/types"

export const getDatahubNodeURL = (chain: CHAINS, network: NETWORKS, protocol?: PROTOCOLS): string => {
  switch (chain) {
    case CHAINS.AVALANCHE:
      return getDataHubAvalancheNodeUrl(network as AVALANCHE_NETWORKS)
    case CHAINS.POLYGON:
      return getDataHubPolygonNodeUrl(network as POLYGON_NETWORKS, protocol as POLYGON_PROTOCOLS)
    default:
      return ""
  }
}

const getDataHubPolygonNodeUrl = (network: POLYGON_NETWORKS, protocol: POLYGON_PROTOCOLS): string => {
  if (network === POLYGON_NETWORKS.MAINNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_MAINNET_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_MAINNET_JSONRPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_MAINNET_WS_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`
    }
  } else if (network === POLYGON_NETWORKS.TESTNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_TESTNET_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_TESTNET_JSONRPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_TESTNET_WS_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`
    }
  }

  return ""
}

const getDataHubAvalancheNodeUrl = (network: AVALANCHE_NETWORKS): string => {
  if (network === AVALANCHE_NETWORKS.MAINNET) {
    return `https://${process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_MAINNET_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY}`
  } else if (network === AVALANCHE_NETWORKS.FUJI) {
    return `https://${process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_FUJI_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY}`
  }

  return ""
}