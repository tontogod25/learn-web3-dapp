import { NETWORKS, PROTOCOLS, CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS } from "@/types/types";

export const getDatahubNodeURL = (chain: string, network: NETWORKS, protocol: PROTOCOLS) => {
  switch (chain) {
    case CHAINS.POLYGON:
      return getDataHubPolygonNodeUrl(network, protocol);
    default:
      break;
  }
}

const getDataHubPolygonNodeUrl = (network: POLYGON_NETWORKS, protocol: POLYGON_PROTOCOLS) => {
  if (network === POLYGON_NETWORKS.MAINNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_MAINNET_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_MAINNET_JSONRPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_MAINNET_WS_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`;
    }
  } else if (network === POLYGON_NETWORKS.TESTNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_TESTNET_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_TESTNET_JSONRPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_TESTNET_WS_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_POLYGON_API_KEY}`;
    }
  }
}