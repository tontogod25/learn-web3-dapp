import {ChainsType, CHAINS} from 'types';

export const GRID_LAYOUT = [13, 11];
export const HEADER_HEIGHT = 80;
export const FOOTER_HEIGHT = 90;

export const CHAINS_CONFIG: ChainsType = {
  [CHAINS.AVALANCHE]: {
    id: CHAINS.AVALANCHE,
    label: 'Avalanche',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=010',
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to Avalanche',
      },
      {
        id: 'account',
        title: 'Create a keypair',
      },
      {
        id: 'balance',
        title: 'Get the balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some AVAX',
      },
      {
        id: 'export',
        title: 'Export tokens from X-Chain to C-Chain',
      },
      {
        id: 'import',
        title: 'Import tokens from X-Chain to C-Chain',
      },
    ],
  },
  [CHAINS.CELO]: {
    id: CHAINS.CELO,
    label: 'Celo',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/celo-celo-logo.svg?v=010',
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to Celo',
      },
      {
        id: 'account',
        title: 'Create an account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some tokens',
      },
      {
        id: 'swap',
        title: 'Swap cUSD to CELO',
      },
      {
        id: 'deploy',
        title: 'Deploy a smart contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
      },
    ],
  },
  [CHAINS.NEAR]: {
    id: CHAINS.NEAR,
    label: 'NEAR',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010',
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to NEAR',
      },
      {
        id: 'keypair',
        title: 'Generate a keypair',
      },
      {
        id: 'account',
        title: 'Create an account',
      },
      {
        id: 'balance',
        title: 'Get account balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some NEAR',
      },
      {
        id: 'deploy',
        title: 'Deploy a contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
      },
    ],
  },
  [CHAINS.POLKADOT]: {
    id: CHAINS.POLKADOT,
    label: 'Polkadot',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010',
    steps: [
      {
        id: 'connect',
        title: 'Connect to Polkadot',
      },
      {
        id: 'account',
        title: 'Create an account',
      },
      {
        id: 'restore',
        title: 'Restore an account',
      },
      {
        id: 'estimate',
        title: 'Estimate transaction fees',
      },
      {
        id: 'balance',
        title: 'Get the balance',
      },
      {
        id: 'deposit',
        title: 'Existential deposit',
      },
      {
        id: 'transfer',
        title: 'Transfer some tokens',
      },
    ],
  },
  [CHAINS.POLYGON]: {
    id: CHAINS.POLYGON,
    label: 'Polygon',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=010',
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to Polygon',
      },
      {
        id: 'query',
        title: 'Query Polygon',
      },
      {
        id: 'balance',
        title: 'Fund a Polygon account',
      },
      {
        id: 'transfer',
        title: 'Transfer some MATIC',
      },
      {
        id: 'deploy',
        title: 'Deploy a Solidity smart contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of the contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of the contract',
      },
      {
        id: 'restore',
        title: 'Restore your account',
      },
    ],
  },
  [CHAINS.SECRET]: {
    id: CHAINS.SECRET,
    label: 'Secret',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/secret-scrt-logo.svg?v=010',
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to Secret',
      },
      {
        id: 'account',
        title: 'Create an account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some SCRT',
      },
      {
        id: 'deploy',
        title: 'Deploy a smart contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
      },
    ],
  },
  [CHAINS.SOLANA]: {
    id: CHAINS.SOLANA,
    label: 'Solana',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=010',
    active: true,
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to Solana',
      },
      {
        id: 'account',
        title: 'Create an account',
      },
      {
        id: 'fund',
        title: 'Fund the account with SOL',
      },
      {
        id: 'balance',
        title: 'Get the balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some SOL',
      },
      {
        id: 'deploy',
        title: 'Deploy a program',
      },
      {
        id: 'greeter',
        title: 'Create storage for the program',
      },
      {
        id: 'getter',
        title: 'Get data from the program',
      },
      {
        id: 'setter',
        title: 'Send data to the program',
      },
    ],
  },
  [CHAINS.TEZOS]: {
    id: CHAINS.TEZOS,
    label: 'Tezos',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=010',
    steps: [
      {
        id: 'setup',
        title: 'Setup the project',
      },
      {
        id: 'connect',
        title: 'Connect to Tezos',
      },
      {
        id: 'account',
        title: 'Create an account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some TEZ',
      },
      {
        id: 'deploy',
        title: 'Deploy a smart contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
      },
    ],
  },
};
