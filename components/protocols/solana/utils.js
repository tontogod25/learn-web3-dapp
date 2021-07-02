// Helper for generating an account URL on Solana Explorer
export const getAccountExplorerURL = (address) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

// Helper for generating a transaction URL on Solana Explorer
export const getTxExplorerURL = (signature) => {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}