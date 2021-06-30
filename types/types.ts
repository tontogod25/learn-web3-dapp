// ---------------------------------------------------

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
  POLYGON = "POLYGON",
}
export type NETWORKS = POLYGON_NETWORKS
export type PROTOCOLS = POLYGON_PROTOCOLS

// ---------------------------------------------------

export type ProtocolType = {
  id: string
  active: boolean
  logoUrl: string
  steps?: StepType[]
}

export type ProtocolsType = {
  [key: string]: ProtocolType
}

export type StepType = {
  id: string
  title: string
  url: string
}