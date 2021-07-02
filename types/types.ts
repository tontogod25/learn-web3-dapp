// ---------------------------------------------------

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

// All
export enum CHAINS {
  AVALANCHE = "AVALANCHE",
  POLYGON = "POLYGON",
}
export type NETWORKS = POLYGON_NETWORKS | AVALANCHE_NETWORKS
export type PROTOCOLS = POLYGON_PROTOCOLS

// ---------------------------------------------------

export type ChainType = {
  id: string
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