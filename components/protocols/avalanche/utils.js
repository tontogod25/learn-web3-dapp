// Datahub Node's RPC URL
export const getNodeRpcURL = () => {
  return process.env.NEXT_PUBLIC_USE_DATAHUB === "true"
    ? `https://${process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_FUJI_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY}`
    : process.env.NEXT_PUBLIC_DEVNET_URL;
}
