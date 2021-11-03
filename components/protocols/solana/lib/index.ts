import {
  CHAINS,
  GlobalStateT,
  SOLANA_NETWORKS,
  SOLANA_PROTOCOLS,
  PROTOCOL_INNER_STATES_ID,
} from 'types';
import {
  getCurrentChainId,
  getChainInnerState,
  getNetworkForCurrentChain,
} from 'context';
import {getNodeURL as getNodeUrl} from 'utils/datahub';

// Helper for generating an account URL on Solana Explorer
export const accountExplorer = (address: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/address/${address}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  }
};

// Helper for generating an transaction URL on Solana Explorer
export const transactionExplorer = (hash: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/tx/${hash}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
  }
};

export const prettyError = (error: any) => {
  return {
    message: error?.response?.data ?? 'Unknown message',
    file: error?.config?.url ?? 'Unknown file',
    args: error?.config?.data
      ? JSON.parse(error.config.data)
      : {error: 'Unknown'},
  };
};

export const getNodeURL = (network?: string) =>
  getNodeUrl(
    CHAINS.SOLANA,
    SOLANA_NETWORKS.DEVNET,
    SOLANA_PROTOCOLS.RPC,
    network,
  );

export const getSolanaState = (state: GlobalStateT) => {
  const solanaState: any = {};
  const chainId = getCurrentChainId(state);
  const network = getNetworkForCurrentChain(state);
  const address = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  if (address) {
    solanaState.address = address;
  }
  const secret = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.SECRET,
  );

  if (secret) {
    solanaState.secret = secret;
  }
  const programId = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.PROGRAM_ID,
  );

  if (programId) {
    solanaState.programId = programId;
  }

  const greeter = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.GREETER,
  );
  if (greeter) {
    solanaState.greeter = greeter;
  }

  return {network, ...solanaState};
};
