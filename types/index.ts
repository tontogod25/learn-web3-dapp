export enum CHAINS {
  AVALANCHE = 'avalanche',
  CELO = 'celo',
  THE_GRAPH = 'the_graph',
  NEAR = 'near',
  POLYGON = 'polygon',
  POLKADOT = 'polkadot',
  SECRET = 'secret',
  SOLANA = 'solana',
  TEZOS = 'tezos',
}

// ----------------------------- Avalanche
export enum AVALANCHE_NETWORKS {
  MAINNET = 'MAINNET',
  FUJI = 'FUJI',
}

export enum AVALANCHE_PROTOCOLS {
  RPC = 'RPC',
}

// ----------------------------- Celo
export enum CELO_NETWORKS {
  MAINNET = 'MAINNET',
  ALFAJORES = 'alfajores',
}

export enum CELO_PROTOCOLS {
  RPC = 'RPC',
}
// -----------------------------

// ----------------------------- Secret
export enum SECRET_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'HOLODECK-2',
}

export enum SECRET_PROTOCOLS {
  RPC = 'RPC',
  LCD = 'LCD',
}
// -----------------------------

// ----------------------------- Near
export enum NEAR_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

export enum NEAR_PROTOCOLS {
  RPC = 'RPC',
}
// -----------------------------

// ----------------------------- Tezos
export enum TEZOS_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

export enum TEZOS_PROTOCOLS {
  RPC = 'RPC',
}
// -----------------------------

// -----------------------------  Polkadot
export enum POLKADOT_NETWORKS {
  WESTEND = 'WESTEND',
  MAINNET = 'MAINNET',
}

export enum POLKADOT_PROTOCOLS {
  RPC = 'RPC',
  WS = 'WS',
}
// -----------------------------

// -----------------------------  Polygon
export enum POLYGON_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

export enum POLYGON_PROTOCOLS {
  RPC = 'RPC',
  JSON_RPC = 'JSON_RPC',
  WS = 'WS',
}
// -----------------------------

// -----------------------------  Solana
export enum SOLANA_NETWORKS {
  MAINNET = 'MAINNET',
  DEVNET = 'DEVNET',
}

export enum SOLANA_PROTOCOLS {
  RPC = 'RPC',
  WS = 'WS',
}
// -----------------------------

export type NETWORKS =
  | POLYGON_NETWORKS
  | AVALANCHE_NETWORKS
  | SOLANA_NETWORKS
  | POLKADOT_NETWORKS
  | NEAR_NETWORKS
  | SECRET_NETWORKS
  | CELO_NETWORKS
  | TEZOS_NETWORKS;

export type PROTOCOLS =
  | POLYGON_PROTOCOLS
  | SOLANA_PROTOCOLS
  | POLKADOT_PROTOCOLS
  | AVALANCHE_PROTOCOLS
  | SECRET_PROTOCOLS
  | NEAR_PROTOCOLS
  | CELO_PROTOCOLS
  | TEZOS_PROTOCOLS;

// ---------------------------------------------------
export type ChainType = {
  id: CHAINS;
  label: string;
  active: boolean;
  logoUrl: string;
  steps: StepType[];
};

export type ChainsType = {
  [key: string]: ChainType;
};

export type StepType = {
  id: string;
  title: string;
  skipValidation?: boolean;
  url?: string;
};

export enum UserActivity {
  PROTOCOL_CLICKED = 'PROTOCOL_CLICKED',
  TUTORIAL_STEP_VIEWED = 'TUTORIAL_STEP_VIEWED',
  STORAGE_CLEARED = 'STORAGE_CLEARED',
}

export interface ProtocolI {
  chainId: string;
  clear(chain: string): void;
  validate(n: number): void;
  step: StepType;
  index?: number;
}

export type MarkdownForChainT = {
  [stepId: string]: string;
};
