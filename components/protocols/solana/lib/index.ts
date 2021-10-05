import {
  CHAINS,
  GlobalStateT,
  SOLANA_NETWORKS,
  SOLANA_PROTOCOLS,
  PROTOCOL_INNER_STATES_ID,
} from 'types';
import {getCurrentChainId, getChainInnerState} from 'context';
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

const getSolanaInnerState = (state: GlobalStateT) => {
  const solanaInnerState: any = {};
  const chainId = getCurrentChainId(state);
  const address = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  if (address) {
    solanaInnerState.address = address;
  }
  const secret = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.SECRET,
  );

  if (secret) {
    solanaInnerState.secret = secret;
  }
  const programId = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.PROGRAM_ID,
  );

  if (programId) {
    solanaInnerState.greeter = programId;
  }

  const greeter = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.GREETER,
  );
  if (greeter) {
    solanaInnerState.greeter = greeter;
  }

  return solanaInnerState;
};

export {
  prettyError,
  accountExplorer,
  transactionExplorer,
  getNodeURL,
  getSolanaInnerState,
};
