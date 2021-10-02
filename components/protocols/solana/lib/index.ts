import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import {getNodeURL as getNodeUrl} from 'utils/datahub';

// Helper for generating an account URL on Solana Explorer
const accountExplorer = (address: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/address/${address}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  }
};

// Helper for generating an transaction URL on Solana Explorer
const transactionExplorer = (hash: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/tx/${hash}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
  }
};

const prettyError = (error: any) => {
  return {
    message: error?.response?.data ?? 'Unknown message',
    file: error?.config?.url ?? 'Unknown file',
    args: error?.config?.data
      ? JSON.parse(error.config.data)
      : {error: 'Unknown'},
  };
};

const getNodeURL = (network?: string) =>
  getNodeUrl(
    CHAINS.SOLANA,
    SOLANA_NETWORKS.DEVNET,
    SOLANA_PROTOCOLS.RPC,
    network,
  );

export {prettyError, accountExplorer, transactionExplorer, getNodeURL};
