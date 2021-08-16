export enum CHAINS {
  AVALANCHE = "avalanche",
  CELO = "celo",
  THE_GRAPH = "the_graph",
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

// Celo
export enum CELO_NETWORKS {
  MAINNET = "MAINNET",
  ALFAJORES = "alfajores"
}


// Secret
export enum SECRET_NETWORKS {
  MAINNET = "MAINNET",
  TESTNET = "HOLODECK-2"
}

// Near
export enum NEAR_NETWORKS {
    MAINNET = "MAINNET",
    TESTNET = "TESTNET"
}


// Tezos
export enum TEZOS_NETWORKS {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET"
}


// Polkadot
export enum POLKADOT_NETWORKS {
  WESTEND = "WESTEND",
  MAINNET = "MAINNET"
}

export enum POLKADOT_PROTOCOLS {
  RPC = "RPC",
  WS = "WS",
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

export type NETWORKS = 
  POLYGON_NETWORKS 
  | AVALANCHE_NETWORKS 
  | SOLANA_NETWORKS 
  | POLKADOT_NETWORKS 
  | NEAR_NETWORKS
  | SECRET_NETWORKS
  | CELO_NETWORKS


  
export type PROTOCOLS = POLYGON_PROTOCOLS | SOLANA_PROTOCOLS | POLKADOT_PROTOCOLS

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
