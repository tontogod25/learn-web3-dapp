import {ChainsType, CHAINS} from 'types';

export const CHAINS_CONFIG: ChainsType = {
  [CHAINS.AVALANCHE]: {
    id: CHAINS.AVALANCHE,
    label: 'Avalanche',
    active: true,
    logoUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=010',
    steps: [
      {
        id: 'connect',
        title: 'Connect to Avalanche',
        url: 'https://learn.figment.io/tutorials/connect-to-avalanche',
      },
      {
        id: 'account',
        title: 'Create a keypair',
        url: 'https://learn.figment.io/tutorials/create-an-avalanche-keypair',
      },
      {
        id: 'balance',
        title: 'Get the balance',
        url: 'https://learn.figment.io/tutorials/get-the-avalanche-balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some AVAX',
        url: 'https://learn.figment.io/tutorials/transfer-some-avax',
      },
      {
        id: 'export',
        title: 'Export tokens from X-Chain to C-Chain',
        url: 'https://learn.figment.io/tutorials/export-token-from-x-chain-to-c-chain',
      },
      {
        id: 'import',
        title: 'Import tokens from X-Chain to C-Chain',
        url: 'https://learn.figment.io/tutorials/import-token-from-x-chain-to-c-chain',
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
        id: 'connect',
        title: 'Connect to Celo',
        url: 'https://learn.figment.io/tutorials/connect-to-celo',
      },
      {
        id: 'account',
        title: 'Create an account',
        url: 'https://learn.figment.io/tutorials/create-a-celo-account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
        url: 'https://learn.figment.io/tutorials/get-the-celo-balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some tokens',
        url: 'https://learn.figment.io/tutorials/transfer-celo-token',
      },
      {
        id: 'swap',
        title: 'Swap cUSD to CELO',
        url: 'https://learn.figment.io/tutorials/swap-your-celo',
      },
      {
        id: 'deploy',
        title: 'Deploy a smart contract',
        url: 'https://learn.figment.io/tutorials/deploy-celo-contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/read-a-celo-contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/celo-set-contract-store',
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
        id: 'connect',
        title: 'Connect to NEAR',
        url: 'https://learn.figment.io/tutorials/connect-to-near-node',
      },
      {
        id: 'keypair',
        title: 'Generate a keypair',
        url: 'https://learn.figment.io/tutorials/create-near-keypair',
      },
      {
        id: 'account',
        title: 'Create an account',
        url: 'https://learn.figment.io/tutorials/create-a-near-account',
      },
      {
        id: 'balance',
        title: 'Get account balance',
        url: 'https://learn.figment.io/tutorials/check-near-account-balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some NEAR',
        url: 'https://learn.figment.io/tutorials/transfer-near-tokens',
      },
      {
        id: 'deploy',
        title: 'Deploy a contract',
        url: 'https://learn.figment.io/tutorials/deploy-near-contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/read-near-contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/near-set-contract-store',
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
        url: 'https://learn.figment.io/tutorials/connect-to-polkadot',
      },
      {
        id: 'account',
        title: 'Create an account',
        url: 'https://learn.figment.io/tutorials/create-an-account-on-polkadot',
      },
      {
        id: 'restore',
        title: 'Restore an account',
        url: 'https://learn.figment.io/tutorials/restore-polkadot-account',
      },
      {
        id: 'estimate',
        title: 'Estimate transaction fees',
        url: 'https://learn.figment.io/tutorials/estimate-polkadot-transaction-fees',
      },
      {
        id: 'balance',
        title: 'Get the balance',
        url: 'https://learn.figment.io/tutorials/get-the-polkadot-balance',
      },
      {
        id: 'deposit',
        title: 'Existential deposit',
        url: 'https://learn.figment.io/tutorials/existential-deposit',
      },
      {
        id: 'transfer',
        title: 'Transfer some tokens',
        url: 'https://learn.figment.io/tutorials/transfer-some-polkadot-token',
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
        id: 'connect',
        title: 'Connect to Polygon',
        url: 'https://learn.figment.io/tutorials/connect-to-polygon',
      },
      {
        id: 'query',
        title: 'Query Polygon',
        url: 'https://learn.figment.io/tutorials/query-polygon',
      },
      {
        id: 'restore',
        title: 'Restore your account',
        url: 'https://learn.figment.io/tutorials/restore-from-mnemonic',
      },
      {
        id: 'balance',
        title: 'Fund a Polygon account',
        url: 'https://learn.figment.io/tutorials/fund-a-polygon-account',
      },
      {
        id: 'transfer',
        title: 'Transfer some MATIC',
        url: 'https://learn.figment.io/tutorials/transfer-some-matic',
      },
      {
        id: 'deploy',
        title: 'Deploy a Solidity smart contract',
        url: 'https://learn.figment.io/tutorials/deploy-a-solidity-smart-contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of the contract',
        url: 'https://learn.figment.io/tutorials/set-contract-storage',
      },
      {
        id: 'getter',
        title: 'Get the storage of the contract',
        url: 'https://learn.figment.io/tutorials/get-contract-storage',
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
        id: 'connect',
        title: 'Connect to Secret',
        url: 'https://learn.figment.io/tutorials/connect-to-secret-node',
      },
      {
        id: 'account',
        title: 'Create an account',
        url: 'https://learn.figment.io/tutorials/create-a-secret-account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
        url: 'https://learn.figment.io/tutorials/check-secret-account-balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some SCRT',
        url: 'https://learn.figment.io/tutorials/transfer-secret-tokens',
      },
      {
        id: 'deploy',
        title: 'Deploy a smart contract',
        url: 'https://learn.figment.io/tutorials/deploy-secret-contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/read-secret-contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/secret-set-contract-store',
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
        id: 'connect',
        title: 'Connect to Solana',
        url: 'https://learn.figment.io/tutorials/connect-to-devnet',
      },
      {
        id: 'account',
        title: 'Create an account',
        url: 'https://learn.figment.io/tutorials/create-solana-keypair',
      },
      {
        id: 'fund',
        title: 'Fund the account with SOL',
        url: 'https://learn.figment.io/tutorials/fund-solana-account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
        url: 'https://learn.figment.io/tutorials/check-solana-account-balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some SOL',
        url: 'https://learn.figment.io/tutorials/transfer-sol-tokens',
      },
      {
        id: 'deploy',
        title: 'Deploy a program',
        url: 'https://learn.figment.io/tutorials/deploy-solana-program',
      },
      {
        id: 'greeter',
        title: 'Create storage for the program',
        url: 'https://learn.figment.io/tutorials/how-to-store-state',
      },
      {
        id: 'getter',
        title: 'Get data from the program',
        url: 'https://learn.figment.io/tutorials/get-greetings',
      },
      {
        id: 'setter',
        title: 'Send data to the program',
        url: 'https://learn.figment.io/tutorials/send-greetings',
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
        id: 'connect',
        title: 'Connect to Tezos',
        url: 'https://learn.figment.io/tutorials/connect-to-tezos-node',
      },
      {
        id: 'account',
        title: 'Create an account',
        url: 'https://learn.figment.io/tutorials/create-a-tezos-account',
      },
      {
        id: 'balance',
        title: 'Get the balance',
        url: 'https://learn.figment.io/tutorials/check-tezos-account-balance',
      },
      {
        id: 'transfer',
        title: 'Transfer some TEZ',
        url: 'https://learn.figment.io/tutorials/transfer-tez-tokens',
      },
      {
        id: 'deploy',
        title: 'Deploy a smart contract',
        url: 'https://learn.figment.io/tutorials/deploy-tezos-contract',
      },
      {
        id: 'getter',
        title: 'Get the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/read-tezos-contract',
      },
      {
        id: 'setter',
        title: 'Set the storage of a smart contract',
        url: 'https://learn.figment.io/tutorials/tezos-set-contract-store',
      },
    ],
  },
};
