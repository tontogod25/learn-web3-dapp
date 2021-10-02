export enum CHAINS {
  AVALANCHE = 'avalanche',
  CELO = 'celo',
  NEAR = 'near',
  POLYGON = 'polygon',
  POLKADOT = 'polkadot',
  SECRET = 'secret',
  SOLANA = 'solana',
  TEZOS = 'tezos',
}

export enum PROTOCOL {
  RPC = 'RPC',
  WS = 'WS',
  LCD = 'LCD',
  JSON_RPC = 'JSON_RPC',
}

export enum NETWORK {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  LOCALNET = 'localnet',
  DEVNET = 'devnet',
  DATAHUB = 'datahub',
}

// Protocol's Enum
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

export enum POLKADOT_PROTOCOLS {
  RPC = 'RPC',
  WS = 'WS',
}

export enum SOLANA_PROTOCOLS {
  RPC = 'RPC',
  WS = 'WS',
}

// ----------------------------- Avalanche
export enum AVALANCHE_NETWORKS {
  MAINNET = 'MAINNET',
  FUJI = 'FUJI',
}

export enum POLYGON_PROTOCOLS {
  RPC = 'RPC',
  JSON_RPC = 'JSON_RPC',
  WS = 'WS',
}

// ----------------------------- Celo
export enum CELO_NETWORKS {
  MAINNET = 'MAINNET',
  ALFAJORES = 'alfajores',
}

// -----------------------------

// ----------------------------- Secret
export enum SECRET_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'HOLODECK-2',
}

// -----------------------------

// ----------------------------- Near
export enum NEAR_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

// -----------------------------

// ----------------------------- Tezos
export enum TEZOS_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

// -----------------------------

// -----------------------------  Polkadot
export enum POLKADOT_NETWORKS {
  WESTEND = 'WESTEND',
  MAINNET = 'MAINNET',
}

// -----------------------------

// -----------------------------  Polygon
export enum POLYGON_NETWORKS {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
  DEFAULT = 'DATAHUB',
}

// -----------------------------

// -----------------------------  Solana
export enum SOLANA_NETWORKS {
  MAINNET = 'MAINNET',
  DEVNET = 'DEVNET',
  DEFAULT = 'DATAHUB',
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
  defaultProtocol: PROTOCOL;
  defaultNetwork: NETWORK;
};

export type ChainsType = {
  [key: string]: ChainType;
};

export type StepType = {
  id: PROTOCOL_STEPS_ID;
  title: string;
  skippable?: boolean;
  position: PROTOCOL_STEPS_POSITION;
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
  network: NETWORK;
  protocol: PROTOCOL;
  isActive: boolean;
  currentStepIndex: number;
  currentStepId: PROTOCOL_STEPS_ID;
  steps: ProtocolStepsT;
  innerState: InnerStateT;
};

export type ProtocolStepT = {
  id: string;
  title: string;
  isVisited: boolean;
  isSkippable: boolean;
  isCompleted: boolean;
  position: PROTOCOL_STEPS_POSITION;
};

export type ProtocolStepsT = {
  [Key in PROTOCOL_STEPS_ID]: ProtocolStepT;
};

export type InnerStateT = {
  [Key in PROTOCOL_INNER_STATES_ID]?: InnerStateTypeT;
};

export type InnerStateTypeT = string | boolean;

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

export enum PROTOCOL_STEPS_POSITION {
  FIRST = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  LAST = 12,
}
