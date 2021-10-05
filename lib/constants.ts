import {
  ChainsType,
  CHAINS,
  PROTOCOL_STEPS_ID,
  POLYGON_PROTOCOLS,
  AVALANCHE_PROTOCOLS,
  AVALANCHE_NETWORKS,
  CELO_PROTOCOLS,
  CELO_NETWORKS,
  POLYGON_NETWORKS,
  NEAR_NETWORKS,
  NEAR_PROTOCOLS,
  SECRET_PROTOCOLS,
  SECRET_NETWORKS,
  TEZOS_NETWORKS,
  TEZOS_PROTOCOLS,
  SOLANA_PROTOCOLS,
  SOLANA_NETWORKS,
  POLKADOT_NETWORKS,
} from 'types';

export const GRID_LAYOUT = [13, 11];
export const HEADER_HEIGHT = 80;
export const FOOTER_HEIGHT = 90;

export const CHAINS_CONFIG: ChainsType = {
  [CHAINS.AVALANCHE]: {
    id: CHAINS.AVALANCHE,
    label: 'Avalanche',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=010',
    protocol: AVALANCHE_PROTOCOLS.RPC,
    network: AVALANCHE_NETWORKS.DATAHUB,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Avalanche',
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_KEYPAIR,
        title: 'Create a keypair',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some AVAX',
      },
      {
        id: PROTOCOL_STEPS_ID.EXPORT_TOKEN,
        title: 'Export tokens from X-Chain to C-Chain',
      },
      {
        id: PROTOCOL_STEPS_ID.IMPORT_TOKEN,
        title: 'Import tokens from X-Chain to C-Chain',
      },
    ],
  },
  [CHAINS.CELO]: {
    id: CHAINS.CELO,
    label: 'Celo',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/celo-celo-logo.svg?v=010',
    protocol: CELO_PROTOCOLS.RPC,
    network: CELO_NETWORKS.ALFAJORES,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Celo',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some tokens',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.SWAP_TOKEN,
        title: 'Swap cUSD to CELO',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        skippable: true,
      },
    ],
  },
  [CHAINS.NEAR]: {
    id: CHAINS.NEAR,
    label: 'NEAR',
    active: false,
    logoUrl: 'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010',
    protocol: NEAR_PROTOCOLS.RPC,
    network: NEAR_NETWORKS.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to NEAR',
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_KEYPAIR,
        title: 'Generate a keypair',
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get account balance',
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some NEAR',
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a contract',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
      },
    ],
  },
  [CHAINS.POLKADOT]: {
    id: CHAINS.POLKADOT,
    label: 'Polkadot',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010',
    protocol: POLYGON_PROTOCOLS.WS,
    network: POLKADOT_NETWORKS.WESTEND,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Polkadot',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.RESTORE_ACCOUNT,
        title: 'Restore an account',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.ESTIMATE_FEES,
        title: 'Estimate transaction fees',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.ESTIMATE_DEPOSIT,
        title: 'Existential deposit',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some tokens',
        skippable: true,
      },
    ],
  },
  [CHAINS.POLYGON]: {
    id: CHAINS.POLYGON,
    label: 'Polygon',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=010',
    protocol: POLYGON_PROTOCOLS.RPC,
    network: POLYGON_NETWORKS.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Polygon',
      },
      {
        id: PROTOCOL_STEPS_ID.QUERY_CHAIN,
        title: 'Query Polygon',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Fund a Polygon account',
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some MATIC',
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a Solidity smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of the contract',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of the contract',
      },
      {
        id: PROTOCOL_STEPS_ID.RESTORE_ACCOUNT,
        title: 'Restore your account',
      },
    ],
  },
  [CHAINS.SECRET]: {
    id: CHAINS.SECRET,
    label: 'Secret',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/secret-scrt-logo.svg?v=010',
    protocol: SECRET_PROTOCOLS.RPC,
    network: SECRET_NETWORKS.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Secret',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some SCRT',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        skippable: true,
      },
    ],
  },
  [CHAINS.SOLANA]: {
    id: CHAINS.SOLANA,
    label: 'Solana',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=010',
    protocol: SOLANA_PROTOCOLS.RPC,
    network: SOLANA_NETWORKS.DEVNET,
    active: true,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Solana',
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
      },
      {
        id: PROTOCOL_STEPS_ID.FUND_ACCOUNT,
        title: 'Fund the account with SOL',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some SOL',
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a program',
      },
      {
        id: PROTOCOL_STEPS_ID.SOLANA_CREATE_GREETER,
        title: 'Create storage for the program',
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get data from the program',
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Send data to the program',
      },
    ],
  },
  [CHAINS.TEZOS]: {
    id: CHAINS.TEZOS,
    label: 'Tezos',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=010',
    protocol: TEZOS_PROTOCOLS.RPC,
    network: TEZOS_NETWORKS.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Tezos',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some TEZ',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        skippable: true,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        skippable: true,
      },
    ],
  },
};
