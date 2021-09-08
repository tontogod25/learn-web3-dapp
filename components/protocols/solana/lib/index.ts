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
export const accountExplorer = (address: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/address/${address}?cluster=custom&customUrl=http://127.0.0.1:8899`
  } else {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  }
}


export const transactionExplorer = (hash: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/tx/${hash}?cluster=custom&customUrl=http://127.0.0.1:8899`
  } else {
    return `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
  }
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
/*
export const getSafeUrl0 = (force = true ) => 
  force 
    ? "https://api.devnet.solana.com" 
    : getSolanaUrl(SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC)
*/
export const getSafeUrl = (network: string) => {
  if (network === 'localhost') {
    return "http://localhost:8899";
  } else {
    return "https://api.devnet.solana.com"; 
  }
} 
