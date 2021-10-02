import {
  ChainsType,
  CHAINS,
  PROTOCOL,
  NETWORK,
  PROTOCOL_STEPS_ID,
  PROTOCOL_STEPS_POSITION,
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
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Avalanche',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_KEYPAIR,
        title: 'Create a keypair',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some AVAX',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.EXPORT_TOKEN,
        title: 'Export tokens from X-Chain to C-Chain',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.IMPORT_TOKEN,
        title: 'Import tokens from X-Chain to C-Chain',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.CELO]: {
    id: CHAINS.CELO,
    label: 'Celo',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/celo-celo-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Celo',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some tokens',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.SWAP_TOKEN,
        title: 'Swap cUSD to CELO',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a smart contract',
        position: PROTOCOL_STEPS_POSITION.SIX,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.SEVEN,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.NEAR]: {
    id: CHAINS.NEAR,
    label: 'NEAR',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to NEAR',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_KEYPAIR,
        title: 'Generate a keypair',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get account balance',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some NEAR',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a contract',
        position: PROTOCOL_STEPS_POSITION.SIX,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.SEVEN,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.POLKADOT]: {
    id: CHAINS.POLKADOT,
    label: 'Polkadot',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Polkadot',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.RESTORE_ACCOUNT,
        title: 'Restore an account',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.ESTIMATE_FEES,
        title: 'Estimate transaction fees',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.ESTIMATE_DEPOSIT,
        title: 'Existential deposit',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some tokens',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.POLYGON]: {
    id: CHAINS.POLYGON,
    label: 'Polygon',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Polygon',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.QUERY_CHAIN,
        title: 'Query Polygon',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Fund a Polygon account',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some MATIC',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a Solidity smart contract',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of the contract',
        position: PROTOCOL_STEPS_POSITION.SIX,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of the contract',
        position: PROTOCOL_STEPS_POSITION.SEVEN,
      },
      {
        id: PROTOCOL_STEPS_ID.RESTORE_ACCOUNT,
        title: 'Restore your account',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.SECRET]: {
    id: CHAINS.SECRET,
    label: 'Secret',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/secret-scrt-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Secret',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some SCRT',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a smart contract',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.SIX,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.SOLANA]: {
    id: CHAINS.SOLANA,
    label: 'Solana',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.DEVNET,
    active: true,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Solana',
        position: PROTOCOL_STEPS_POSITION.ONE,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.FUND_ACCOUNT,
        title: 'Fund the account with SOL',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some SOL',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a program',
        position: PROTOCOL_STEPS_POSITION.SIX,
      },
      {
        id: PROTOCOL_STEPS_ID.SOLANA_CREATE_GREETER,
        title: 'Create storage for the program',
        position: PROTOCOL_STEPS_POSITION.SEVEN,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get data from the program',
        position: PROTOCOL_STEPS_POSITION.EIGHT,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Send data to the program',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
  [CHAINS.TEZOS]: {
    id: CHAINS.TEZOS,
    label: 'Tezos',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=010',
    defaultProtocol: PROTOCOL.RPC,
    defaultNetwork: NETWORK.TESTNET,
    steps: [
      {
        id: PROTOCOL_STEPS_ID.PROJECT_SETUP,
        title: 'Setup the project',
        skippable: true,
        position: PROTOCOL_STEPS_POSITION.FIRST,
      },
      {
        id: PROTOCOL_STEPS_ID.CHAIN_CONNECTION,
        title: 'Connect to Tezos',
        position: PROTOCOL_STEPS_POSITION.TWO,
      },
      {
        id: PROTOCOL_STEPS_ID.CREATE_ACCOUNT,
        title: 'Create an account',
        position: PROTOCOL_STEPS_POSITION.THREE,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_BALANCE,
        title: 'Get the balance',
        position: PROTOCOL_STEPS_POSITION.FOUR,
      },
      {
        id: PROTOCOL_STEPS_ID.TRANSFER_TOKEN,
        title: 'Transfer some TEZ',
        position: PROTOCOL_STEPS_POSITION.FIVE,
      },
      {
        id: PROTOCOL_STEPS_ID.DEPLOY_CONTRACT,
        title: 'Deploy a smart contract',
        position: PROTOCOL_STEPS_POSITION.SIX,
      },
      {
        id: PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE,
        title: 'Get the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.SEVEN,
      },
      {
        id: PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE,
        title: 'Set the storage of a smart contract',
        position: PROTOCOL_STEPS_POSITION.LAST,
      },
    ],
  },
};
