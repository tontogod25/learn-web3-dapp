import {
  NETWORKS,
  PROTOCOLS,
  CHAINS,
  AVALANCHE_NETWORKS,
  NEAR_NETWORKS,
  CELO_NETWORKS,
  SECRET_NETWORKS,
  POLKADOT_NETWORKS,
  POLKADOT_PROTOCOLS,
  POLYGON_NETWORKS,
  POLYGON_PROTOCOLS,
  SOLANA_NETWORKS,
  SOLANA_PROTOCOLS,
} from 'types';

export const getNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
  node?: string,
): string => {
  if (node === 'datahub') {
    return getDatahubNodeURL(chain, network, protocol);
  } else if (node === 'devnet') {
    return getTestnetNodeURL(chain);
  } else if (node === 'localnet') {
    return getLocalNodeURL(chain);
  } else {
    return getTestnetNodeURL(chain);
  }
};

const getTestnetNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.SOLANA:
      return 'https://api.devnet.solana.com';
    default:
      return '';
  }
};

const getLocalNodeURL = (chain: CHAINS): string => {
  switch (chain) {
    case CHAINS.SOLANA:
      return 'http://127.0.0.1:8899';
    default:
      return '';
  }
};

export const getDatahubNodeURL = (
  chain: CHAINS,
  network: NETWORKS,
  protocol?: PROTOCOLS,
): string => {
  switch (chain) {
    case CHAINS.AVALANCHE:
      return getDataHubAvalancheNodeUrl(network as AVALANCHE_NETWORKS);
    case CHAINS.NEAR:
      return getDataHubNearNodeUrl(network as NEAR_NETWORKS);
    case CHAINS.POLKADOT:
      return getDataHubPolkadotNodeUrl(
        network as POLKADOT_NETWORKS,
        protocol as POLKADOT_PROTOCOLS,
      );
    case CHAINS.POLYGON:
      return getDataHubPolygonNodeUrl(
        network as POLYGON_NETWORKS,
        protocol as POLYGON_PROTOCOLS,
      );
    case CHAINS.SOLANA:
      return getDataHubSolanaNodeUrl(
        network as SOLANA_NETWORKS,
        protocol as SOLANA_PROTOCOLS,
      );
    case CHAINS.CELO:
      return getDataHubCeloNodeUrl(network as CELO_NETWORKS);
    case CHAINS.SECRET:
      return getDataHubSecretNodeUrl(network as SECRET_NETWORKS);
    default:
      return '';
  }
};

const getDataHubAvalancheNodeUrl = (network: AVALANCHE_NETWORKS): string => {
  if (network === AVALANCHE_NETWORKS.MAINNET) {
    return `https://${process.env.DATAHUB_AVALANCHE_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`;
  } else if (network === AVALANCHE_NETWORKS.FUJI) {
    return `https://${process.env.DATAHUB_AVALANCHE_FUJI_RPC_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`;
  }

  return '';
};

const getDataHubNearNodeUrl = (network: NEAR_NETWORKS): string =>
  network === NEAR_NETWORKS.MAINNET
    ? `https://${process.env.DATAHUB_NEAR_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_NEAR_API_KEY}`
    : `https://${process.env.DATAHUB_NEAR_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_NEAR_API_KEY}`;

const getDataHubCeloNodeUrl = (network: CELO_NETWORKS): string =>
  network === CELO_NETWORKS.MAINNET
    ? `https://${process.env.DATAHUB_CELO_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_CELO_API_KEY}/`
    : `https://${process.env.DATAHUB_CELO_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_CELO_API_KEY}/`;
const getDataHubSecretNodeUrl = (network: SECRET_NETWORKS): string =>
  network === SECRET_NETWORKS.MAINNET
    ? `https://${process.env.DATAHUB_SECRET_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
    : `https://${process.env.DATAHUB_SECRET_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`;

const getDataHubPolkadotNodeUrl = (
  network: POLKADOT_NETWORKS,
  protocol: POLKADOT_PROTOCOLS,
): string => {
  if (network === POLKADOT_NETWORKS.WESTEND) {
    if (protocol === POLKADOT_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_POLKADOT_WESTEND_RPC_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`;
    } else if (protocol === POLKADOT_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_POLKADOT_WESTEND_WS_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`;
    }
  } else if (network === POLKADOT_NETWORKS.MAINNET) {
    if (protocol === POLKADOT_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_POLKADOT_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`;
    } else if (protocol === POLKADOT_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_POLKADOT_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_POLKADOT_API_KEY}`;
    }
  }

  return '';
};

const getDataHubPolygonNodeUrl = (
  network: POLYGON_NETWORKS,
  protocol: POLYGON_PROTOCOLS,
): string => {
  if (network === POLYGON_NETWORKS.MAINNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_POLYGON_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.DATAHUB_POLYGON_MAINNET_JSONRPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_POLYGON_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`;
    }
  } else if (network === POLYGON_NETWORKS.TESTNET) {
    if (protocol === POLYGON_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_POLYGON_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.JSON_RPC) {
      return `https://${process.env.DATAHUB_POLYGON_TESTNET_JSONRPC_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`;
    } else if (protocol === POLYGON_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_POLYGON_TESTNET_WS_URL}/apikey/${process.env.DATAHUB_POLYGON_API_KEY}`;
    }
  }

  return '';
};

const getDataHubSolanaNodeUrl = (
  network: SOLANA_NETWORKS,
  protocol: SOLANA_PROTOCOLS,
): string => {
  if (network === SOLANA_NETWORKS.MAINNET) {
    if (protocol === SOLANA_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_SOLANA_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`;
    } else if (protocol === SOLANA_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_SOLANA_MAINNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`;
    }
  } else if (network === SOLANA_NETWORKS.DEVNET) {
    if (protocol === SOLANA_PROTOCOLS.RPC) {
      return `https://${process.env.DATAHUB_SOLANA_DEVNET_RPC_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`;
    } else if (protocol === SOLANA_PROTOCOLS.WS) {
      return `wss://${process.env.DATAHUB_SOLANA_DEVNET_WS_URL}/apikey/${process.env.DATAHUB_SOLANA_API_KEY}`;
    }
  }

  return '';
};
