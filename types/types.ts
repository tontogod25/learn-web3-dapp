export enum CHAINS {
  AVALANCHE = "avalanche",
  CELO = "celo",
  NEAR = "near",
  POLYGON = "polygon",
  POLKADOT = "polkadot",
  SECRET = "secret",
  SOLANA = "solana",
  TEZOS = "tezos",
}

// Avalanche
export enum AVALANCHE_NETWORKS {
  MAINNET = "MAINNET",
  FUJI = "FUJI"
}

// Polygon
export enum POLYGON_NETWORKS {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET"
}
export enum POLYGON_PROTOCOLS {
  RPC = "RPC",
  JSON_RPC = "JSON_RPC",
  WS = "WS"
}

// Solana
export enum SOLANA_NETWORKS {
  MAINNET = "MAINNET",
  DEVNET = "DEVNET"
}
export enum SOLANA_PROTOCOLS {
  RPC = "RPC",
  WS = "WS"
}

export type NETWORKS = POLYGON_NETWORKS | AVALANCHE_NETWORKS | SOLANA_NETWORKS
export type PROTOCOLS = POLYGON_PROTOCOLS | SOLANA_PROTOCOLS

// ---------------------------------------------------

export type ChainType = {
  id: CHAINS
  label: string
  active: boolean
  logoUrl: string
  steps: StepType[]
}

export type ChainsType = {
  [key: string]: ChainType
}

export type StepType = {
  id: string
  title: string
  url: string
}