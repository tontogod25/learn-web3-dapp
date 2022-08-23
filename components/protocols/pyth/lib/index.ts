import {CHAINS, PYTH_NETWORKS, PYTH_PROTOCOLS} from 'types';
import {getNodeURL as getNodeUrl} from 'utils/external';

/**
 * Helper for generating an account URL on Solana Explorer
 * @param network - A Solana cluster identifier, one of ['mainnet-beta', 'devnet', 'testnet', 'localnet']
 * @returns URL
 */
export const accountExplorer = (network: string) => (address: string) => {
  if (network === PYTH_NETWORKS.LOCALNET) {
    return `https://explorer.solana.com/address/${address}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else if (network === PYTH_NETWORKS.DEVNET) {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  } else if (network === PYTH_NETWORKS.TESTNET) {
    return `https://explorer.solana.com/address/${address}?cluster=testnet`;
  } else {
    return `https://explorer.solana.com/address/${address}`;
  }
};

/**
 * Helper for generating a transaction URL on Solana Explorer
 * @param network - A Solana cluster identifier, one of ['mainnet-beta', 'devnet', 'testnet', 'localnet']
 * @returns URL
 */
export const transactionExplorer = (network: string) => (hash: string) => {
  if (network === PYTH_NETWORKS.LOCALNET) {
    return `https://explorer.solana.com/tx/${hash}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else if (network === PYTH_NETWORKS.DEVNET) {
    return `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
  } else if (network === PYTH_NETWORKS.TESTNET) {
    return `https://explorer.solana.com/tx/${hash}?cluster=testnet`;
  } else if (network === PYTH_NETWORKS.MAINNET) {
    return `https://explorer.solana.com/tx/${hash}`;
  }
};

/**
 * Helper for generating an account URL on solscan.io
 * @param network - A Solana cluster identifier, one of ['mainnet-beta', 'devnet', 'testnet'] * `localnet` is not supported.
 * @param pubkey - A valid Solana public key
 * @returns URL
 */
export const accountSolscan = (network: string, pubkey: string) => {
  if (network === PYTH_NETWORKS.DEVNET) {
    return `https://solscan.io/account/${pubkey}?cluster=devnet`;
  } else if (network === PYTH_NETWORKS.TESTNET) {
    return `https://solscan.io/account/${pubkey}?cluster=testnet`;
  } else if (network === PYTH_NETWORKS.MAINNET) {
    return `https://solscan.io/account/${pubkey}`;
  }
};

/**
 * Helper for generating a transaction URL on solscan.io
 * @param network - A Solana cluster identifier, one of ['mainnet-beta', 'devnet', 'testnet'] * `localnet` is not supported.
 * @param hash - A valid Solana transaction hash
 * @returns URL
 */
export const transactionSolscan = (network: string, hash: string) => {
  if (network === PYTH_NETWORKS.DEVNET) {
    return `https://solscan.io/tx/${hash}?cluster=devnet`;
  } else if (network === PYTH_NETWORKS.TESTNET) {
    return `https://solscan.io/tx/${hash}?cluster=testnet`;
  } else if (network === PYTH_NETWORKS.MAINNET) {
    return `https://solscan.io/tx/${hash}`;
  }
};

/**
 * Helper function for showing Pyth market data on pyth.network
 * @param network - A Solana cluster identifier, one of ['mainnet-beta', 'devnet', 'testnet']
 * @param product - A Pyth product name in the format <product_type>.<TokenA>/<TokenB> e.g. 'Crypto.SOL/USD'
 *                - Note: If no network is specified, the URL will not require the product type, so pass the product as the token pair only, e.g. AUD/USD instead of FX.AUD/USD
 * @returns URL
 */
export const pythMarketExplorer = (network: string, product: string) => {
  if (!network) {
    return `https://pyth.network/markets/#${product}`; // Product
  }
  return `https://pyth.network/markets/?cluster=${network}#${product}`;
};

/**
 * Helper function for getting the endpoint URL
 * @param network A network identifier, one of ['devnet', 'localnet']
 * @returns URL
 *
 * - NOTE: This function, `getNodeURL` prefills chain, network and protocol for the util function `getNodeUrl`.
 */
export const getNodeURL = (network?: string) =>
  getNodeUrl(CHAINS.PYTH, PYTH_NETWORKS.DEVNET, PYTH_PROTOCOLS.RPC, network);
