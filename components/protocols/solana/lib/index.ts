// Solana
export enum SOLANA_NETWORKS {
  MAINNET = "MAINNET",
  DEVNET = "DEVNET"
}

export enum SOLANA_PROTOCOLS {
  RPC = "RPC",
  WS = "WS"
}

// Helper for generating an account URL on Solana Explorer
export const accountExplorer = (address: string) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

// Helper for generating a transaction URL on Solana Explorer
export const transactionExplorer = (signature: string) => {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}

export const getSolanaUrl = (network: SOLANA_NETWORKS, protocol: SOLANA_PROTOCOLS): string => {
  if (network === SOLANA_NETWORKS.MAINNET) {
      return protocol === SOLANA_PROTOCOLS.RPC
          ?  `https://${process.env.DATAHUB_SOLANA_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
          :  `wss://${process.env.DATAHUB_SOLANA_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
  } else {
      return protocol === SOLANA_PROTOCOLS.RPC
          ? `https://${process.env.DATAHUB_SOLANA_DEVNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
          : `wss://${process.env.DATAHUB_SOLANA_DEVNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
  }
}

export const getSafeUrl = (force = true ) => 
  force 
    ? "https://api.devnet.solana.com" 
    : getSolanaUrl(SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC)
