import {
  NETWORKS,
  PROTOCOLS,
  CHAINS,
  NEAR_NETWORKS,
  CELO_NETWORKS,
  SECRET_NETWORKS,
  POLKADOT_NETWORKS,
  POLKADOT_PROTOCOLS,
  SOLANA_NETWORKS,
} from 'types';

export const getNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
  node?: string,
): string => {
  if (node === 'devnet') {
    return getTestnetNodeURL(chain);
  }
  if (node === 'localnet') {
    return getLocalNodeURL(chain);
  }
  return getExternalNodeURL(chain, network, protocol);
};

const getTestnetNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.SOLANA:
      return 'https://api.devnet.solana.com';
    case CHAINS.AVALANCHE:
      return 'https://api.avax-test.network';
    case CHAINS.NEAR:
      return 'https://rpc.testnet.near.org';
    case CHAINS.CERAMIC:
      return 'https://ceramic-clay.3boxlabs.com';
    default:
      return '';
  }
};

const getLocalNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.SOLANA:
      return 'http://127.0.0.1:8899';
    case CHAINS.AVALANCHE:
      return 'http://127.0.0.1:9650';
    default:
      return '';
  }
};

export const getExternalNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
): string => {
  switch (chain) {
    case CHAINS.AVALANCHE:
      return getExternalAvalancheNodeUrl();
    case CHAINS.NEAR:
      return getExternalNearNodeUrl();
    case CHAINS.POLKADOT:
      return getExternalPolkadotNodeUrl(
        network as POLKADOT_NETWORKS,
        protocol as POLKADOT_PROTOCOLS,
      );
    case CHAINS.SOLANA:
      return getExternalSolanaNodeUrl(network as SOLANA_NETWORKS);
    case CHAINS.CELO:
      return getExternalCeloNodeUrl();
    case CHAINS.SECRET:
      return getExternalSecretNodeUrl();
    default:
      return '';
  }
};

const getExternalAvalancheNodeUrl = (): string =>
  `${process.env.AVALANCHE_TESTNET_URL}`;

const getExternalNearNodeUrl = (): string => `${process.env.NEAR_TESTNET_URL}`;

const getExternalCeloNodeUrl = (): string => `${process.env.CELO_TESTNET_URL}`;

const getExternalSecretNodeUrl = (): string =>
  `${process.env.SECRET_TESTNET_URL}`;

const getExternalPolkadotNodeUrl = (
  network: POLKADOT_NETWORKS,
  protocol: POLKADOT_PROTOCOLS,
): string => {
  if (network === POLKADOT_NETWORKS.TESTNET) {
    if (protocol === POLKADOT_PROTOCOLS.RPC) {
      return `${process.env.POLKADOT_TESTNET_URL}`;
    } else if (protocol === POLKADOT_PROTOCOLS.WS) {
      return `${process.env.POLKADOT_TESTNET_WS_URL}`;
    }
  }
  return '';
};

const getExternalSolanaNodeUrl = (network: SOLANA_NETWORKS): string => {
  if (network === SOLANA_NETWORKS.MAINNET) {
    return `${process.env.SOLANA_MAINNET_URL}`;
  }
  if (network === SOLANA_NETWORKS.DEVNET) {
    return `${process.env.SOLANA_DEVNET_URL}`;
  }
  if (network === SOLANA_NETWORKS.TESTNET) {
    return `${process.env.SOLANA_DEVNET_URL}`;
  }
  if (network === SOLANA_NETWORKS.LOCALNET) {
    return `${process.env.SOLANA_LOCALNET_URL}`;
  }
  return '';
};
