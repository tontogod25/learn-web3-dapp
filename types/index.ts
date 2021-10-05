export enum CHAINS {
  AVALANCHE = 'avalanche',
  CELO = 'celo',
  NEAR = 'near',
  POLYGON = 'polygon',
  POLKADOT = 'polkadot',
  SECRET = 'secret',
  SOLANA = 'solana',
  TEZOS = 'tezos',
  CERAMIC = 'ceramic',
}

// Protocol's Enum
export type PROTOCOLS =
  | POLYGON_PROTOCOLS
  | SOLANA_PROTOCOLS
  | POLKADOT_PROTOCOLS
  | AVALANCHE_PROTOCOLS
  | SECRET_PROTOCOLS
  | NEAR_PROTOCOLS
  | CELO_PROTOCOLS
  | TEZOS_PROTOCOLS
  | CERAMIC_PROTOCOLS;

export enum AVALANCHE_PROTOCOLS {
  RPC = 'RPC',
}

export enum CELO_PROTOCOLS {
  RPC = 'RPC',
}

export enum SECRET_PROTOCOLS {
  RPC = 'RPC',
  LCD = 'LCD',
}

export enum NEAR_PROTOCOLS {
  RPC = 'RPC',
}

export enum TEZOS_PROTOCOLS {
  RPC = 'RPC',
}

export enum POLYGON_PROTOCOLS {
  RPC = 'RPC',
  JSON_RPC = 'JSON_RPC',
  WS = 'WS',
}

export enum POLKADOT_PROTOCOLS {
  RPC = 'RPC',
  WS = 'WS',
}

export enum SOLANA_PROTOCOLS {
  RPC = 'RPC',
  WS = 'WS',
}

// BlockChain Providers -----------------------
export enum CHAIN_PROVIDERS {
  DATAHUB = 'DATAHUB',
  ALCHEMY = 'ALCHEMY',
  INFURA = 'INFURA',
  PUBLIC = 'PUBLIC',
  LOCAL = 'LOCAL',
}

// NETWORKS ----------------------
export enum AVALANCHE_NETWORKS {
  MAINNET = 'MAINNET',
  FUJI = 'FUJI',
}

export enum CELO_NETWORKS {
  MAINNET = 'MAINNET',
  ALFAJORES = 'alfajores',
}

export enum SECRET_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'HOLODECK-2',
}

export enum NEAR_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

export enum TEZOS_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

export enum POLKADOT_NETWORKS {
  WESTEND = 'WESTEND',
  MAINNET = 'MAINNET',
}

export enum POLYGON_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

export enum SOLANA_NETWORKS {
  MAINNET = 'MAINNET',
  DEVNET = 'devnet',
  DATAHUB = 'datahub',
  LOCALNET = 'localnet',
}

// -----------------------------  Ceramic
export enum CERAMIC_NETWORKS {
  TESTNET = 'TESTNET',
}

export enum CERAMIC_PROTOCOLS {
  HTTP = 'HTTP',
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
  | TEZOS_NETWORKS
  | CERAMIC_NETWORKS;

// ---------------------------------------------------
export type ChainType = {
  id: CHAINS;
  label: string;
  active: boolean;
  logoUrl: string;
  steps: StepType[];
  protocol: PROTOCOLS;
  network: NETWORKS;
};

export type ChainsType = {
  [key in CHAINS]: ChainType;
};

export type StepType = {
  id: PROTOCOL_STEPS_ID;
  title: string;
  skippable?: boolean;
};

export enum UserActivity {
  PROTOCOL_CLICKED = 'PROTOCOL_CLICKED',
  TUTORIAL_STEP_VIEWED = 'TUTORIAL_STEP_VIEWED',
  STORAGE_CLEARED = 'STORAGE_CLEARED',
}

export type MarkdownForChainIdT = {
  [key in PROTOCOL_STEPS_ID]: string;
};

//-----------------------------------------------------------
// Global's State
export type GlobalStateT = {
  currentChainId?: CHAINS;
  protocols: ProtocolsStateT;
};

export type ProtocolsStateT = {
  [Key in CHAINS]: ProtocolStateT;
};

export type ProtocolStateT = {
  id: CHAINS;
  label: string;
  logoUrl: string;
  network: NETWORKS;
  protocol: PROTOCOLS;
  isActive: boolean;
  // numberOfSteps
  numberOfStep: number;
  currentStepId: PROTOCOL_STEPS_ID;
  firstStepId: PROTOCOL_STEPS_ID;
  lastStepId: PROTOCOL_STEPS_ID;
  steps: ProtocolStepsT;
  innerState?: InnerStateT;
};

export type ProtocolStepT = {
  id: PROTOCOL_STEPS_ID;
  title: string;
  isVisited: boolean;
  isSkippable: boolean;
  isCompleted: boolean;
  previousStepId: PROTOCOL_STEPS_ID | null;
  nextStepId: PROTOCOL_STEPS_ID | null;
  position: number;
};

export type ProtocolStepsT = {
  [Key in PROTOCOL_STEPS_ID]: ProtocolStepT;
};

export type InnerStateT = {
  [Key in PROTOCOL_INNER_STATES_ID]?: string | null;
};

export enum PROTOCOL_INNER_STATES_ID {
  SECRET = 'SECRET',
  PRIVATE_KEY = 'PRIVATE_KEY',
  PUBLIC_KEY = 'PUBLIC_KEY',
  ADDRESS = 'ADDRESS',
  CONTRACT_ID = 'CONTRACT_ID',
  MNEMONIC = 'MNEMONIC',
  ACCOUNT_ID = 'ACCOUNT_ID',
  PASSWORD = 'PASSWORD',
  EMAIL = 'EMAIL',
  PROGRAM_ID = 'PROGRAM_ID',
  GREETER = 'GREETER',
  METAMASK_NETWORK_NAME = 'METAMASK_NETWORK_NAME',
}

export enum PROTOCOL_STEPS_ID {
  EXPORT_TOKEN = 'EXPORT_TOKEN',
  IMPORT_TOKEN = 'IMPORT_TOKEN',
  SWAP_TOKEN = 'SWAP_TOKEN',
  CREATE_KEYPAIR = 'CREATE_KEYPAIR',
  ESTIMATE_FEES = 'ESTIMATE_FEES',
  ESTIMATE_DEPOSIT = 'ESTIMATE_DEPOSIT',
  QUERY_CHAIN = 'QUERY_CHAIN',
  RESTORE_ACCOUNT = 'RESTORE_ACCOUNT',
  FUND_ACCOUNT = 'FUND_ACCOUNT',
  GET_BALANCE = 'GET_BALANCE',
  TRANSFER_TOKEN = 'TRANSFER_TOKEN',
  SOLANA_CREATE_GREETER = 'SOLANA_CREATE_GREETER',
  PROJECT_SETUP = 'PROJECT_SETUP',
  CHAIN_CONNECTION = 'CHAIN_CONNECTION',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  DEPLOY_CONTRACT = 'DEPLOY_CONTRACT',
  GET_CONTRACT_VALUE = 'GET_CONTRACT_VALUE',
  SET_CONTRACT_VALUE = 'SET_CONTRACT_VALUE',
}
