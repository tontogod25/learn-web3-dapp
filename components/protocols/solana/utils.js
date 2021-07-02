// Datahub Node's RPC URL
export const getNodeRpcURL = () => {
  return process.env.NEXT_PUBLIC_USE_DATAHUB === "true"
    ? `https://${process.env.NEXT_PUBLIC_DATAHUB_SOLANA_DEVNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
    : process.env.NEXT_PUBLIC_DEVNET_URL;
}

// Datahub Node's WS (Web Socket) URL
export const getNodeWsURL = () => {
  return process.env.NEXT_PUBLIC_USE_DATAHUB === "true"
    ? `wss://${process.env.NEXT_PUBLIC_DATAHUB_SOLANA_DEVNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`
    : process.env.NEXT_PUBLIC_DEVNET_URL;
}

// Helper for generating an account URL on Solana Explorer
export const getAccountExplorerURL = (address) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

// Helper for generating a transaction URL on Solana Explorer
export const getTxExplorerURL = (signature) => {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}