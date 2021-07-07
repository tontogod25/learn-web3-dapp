import {
  NETWORKS,
  PROTOCOLS,
  CHAINS,
  AVALANCHE_NETWORKS,
  NEAR_NETWORKS,
  NEAR_PROTOCOLS,
  POLYGON_NETWORKS,
  POLYGON_PROTOCOLS,
  SOLANA_NETWORKS,
  SOLANA_PROTOCOLS
} from "types/types"

export const getDatahubNodeURL = (chain: CHAINS, network: NETWORKS, protocol?: PROTOCOLS): string => {
  switch (chain) {
    case CHAINS.AVALANCHE:
        return getDataHubAvalancheNodeUrl(network as AVALANCHE_NETWORKS)
    case CHAINS.NEAR:
        return getDataHubNearNodeUrl(network as NEAR_NETWORKS, protocol as NEAR_PROTOCOLS)
    case CHAINS.POLYGON:
        return getDataHubPolygonNodeUrl(network as POLYGON_NETWORKS, protocol as POLYGON_PROTOCOLS)
    case CHAINS.SOLANA:
        return getDataHubSolanaNodeUrl(network as SOLANA_NETWORKS, protocol as SOLANA_PROTOCOLS)
    default:
        return ""
  }
}

const getDataHubAvalancheNodeUrl = (network: AVALANCHE_NETWORKS): string => {
  if (network === AVALANCHE_NETWORKS.MAINNET) {
    return `https://${process.env.DATAHUB_AVALANCHE_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`
  } else if (network === AVALANCHE_NETWORKS.FUJI) {
    return `https://${process.env.DATAHUB_AVALANCHE_FUJI_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`
  }

  return ""
}

const getDataHubNearNodeUrl = (network: NEAR_NETWORKS, protocol: NEAR_PROTOCOLS): string => {
  if (network === NEAR_NETWORKS.MAINNET) {
    if (protocol === NEAR_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_NEAR_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_NEAR_API_KEY}`
    } 
  } else if (network === NEAR_NETWORKS.TESTNET) {
    if (protocol === NEAR_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_NEAR_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_NEAR_API_KEY}`
    }
  }
    
    return ""
}

const getDataHubPolygonNodeUrl = (network: POLYGON_NETWORKS, protocol: POLYGON_PROTOCOLS): string => {
  if (network === POLYGON_NETWORKS.MAINNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_POLYGON_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.DATAHUB_POLYGON_MAINNET_JSONRPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_POLYGON_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
    }
  } else if (network === POLYGON_NETWORKS.TESTNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_POLYGON_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.DATAHUB_POLYGON_TESTNET_JSONRPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_POLYGON_TESTNET_WS_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`
    }
  }

  return ""
}

const getDataHubSolanaNodeUrl = (network: SOLANA_NETWORKS, protocol: SOLANA_PROTOCOLS): string => {
  if (network === SOLANA_NETWORKS.MAINNET) {
    if (protocol === SOLANA_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_SOLANA_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
    } else if (protocol === SOLANA_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_SOLANA_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
    }
  } else if (network === SOLANA_NETWORKS.DEVNET) {
    if (protocol === SOLANA_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_SOLANA_DEVNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
    } else if (protocol === SOLANA_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_SOLANA_DEVNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
    }
  }

  return ""
}