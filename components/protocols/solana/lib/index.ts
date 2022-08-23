import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import {getNodeURL as getNodeUrl} from 'utils/external';

// Helper for generating an account URL on Solana Explorer
export const accountExplorer = (network: string) => (address: string) => {
  if (network === SOLANA_NETWORKS.LOCALNET) {
    return `https://explorer.solana.com/address/${address}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  }
};

// Helper for generating an transaction URL on Solana Explorer
export const transactionExplorer = (network: string) => (hash: string) => {
  if (network === SOLANA_NETWORKS.LOCALNET) {
    return `https://explorer.solana.com/tx/${hash}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
  }
};

export const getNodeURL = (network?: string) =>
  getNodeUrl(
    CHAINS.SOLANA,
    SOLANA_NETWORKS.DEVNET,
    SOLANA_PROTOCOLS.RPC,
    network,
  );
