import {
  NETWORK,
  CHAINS,
  SOLANA_NETWORKS,
  CELO_NETWORKS,
  AVALANCHE_NETWORKS,
  POLKADOT_NETWORKS,
  POLYGON_NETWORKS,
  PYTH_NETWORKS,
  NEAR_NETWORKS,
  SECRET_NETWORKS,
  TEZOS_NETWORKS,
} from 'types';

export const networksMap = (
  network: NETWORK,
  chain: CHAINS,
): string | undefined => {
  // SOLANA NETWORKS MAP
  if (chain === CHAINS.SOLANA) {
    if (network === NETWORK.TESTNET) {
      return SOLANA_NETWORKS.DEVNET;
    }
    if (network === NETWORK.LOCALNET) {
      return SOLANA_NETWORKS.LOCALNET;
    }
  }

  // PYTH NETWORKS MAP
  if (chain === CHAINS.PYTH) {
    if (network === NETWORK.DEVNET) {
      return PYTH_NETWORKS.DEVNET;
    }
    if (network === NETWORK.TESTNET) {
      return PYTH_NETWORKS.DEVNET;
    }
    if (network === NETWORK.MAINNET) {
      return PYTH_NETWORKS.MAINNET;
    }
  }

  // AVALANCHE NETWORKS MAP
  if (chain === CHAINS.AVALANCHE) {
    if (network === NETWORK.TESTNET) {
      return AVALANCHE_NETWORKS.TESTNET;
    }
  }

  // CELO NETWORKS MAP
  if (chain === CHAINS.CELO) {
    if (network === NETWORK.TESTNET) {
      return CELO_NETWORKS.TESTNET;
    }
  }

  // SECRET NETWORKS MAP
  if (chain === CHAINS.SECRET) {
    if (network === NETWORK.TESTNET) {
      return SECRET_NETWORKS.TESTNET;
    } else {
      return undefined;
    }
  }

  // NEAR NETWORKS MAP
  if (chain === CHAINS.NEAR) {
    if (network === NETWORK.TESTNET) {
      return NEAR_NETWORKS.TESTNET;
    }
  }

  // TEZOS NETWORKS MAP
  if (chain === CHAINS.TEZOS) {
    if (network === NETWORK.TESTNET) {
      return TEZOS_NETWORKS.TESTNET;
    } else {
      return undefined;
    }
  }

  // POLKADOT NETWORKS MAP
  if (chain === CHAINS.POLKADOT) {
    if (network === NETWORK.TESTNET) {
      return POLKADOT_NETWORKS.TESTNET;
    }
  }

  // POLYGON NETWORKS MAP
  if (chain === CHAINS.POLYGON) {
    if (network === NETWORK.TESTNET) {
      return POLYGON_NETWORKS.TESTNET;
    } else {
      return undefined;
    }
  }
};
