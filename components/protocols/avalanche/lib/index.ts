import {
  CHAINS,
  AVALANCHE_NETWORKS,
  PROTOCOL_INNER_STATES_ID,
  GlobalStateT,
} from 'types';
import {
  getCurrentChainId,
  getChainInnerState,
  getNetworkForCurrentChain,
} from 'context';
import {getNodeURL as getNodeUrl} from 'utils/datahub';
import {Avalanche} from 'avalanche';

const AVALANCHE_NETWORK_ID = 5;
const AVALANCHE_NETWORK_NAME = 'fuji';

const getNodeURL = (network: string) =>
  getNodeUrl(CHAINS.AVALANCHE, AVALANCHE_NETWORKS.FUJI, undefined, network);

const getAvalancheClient = (network: string) => {
  const url = new URL(getNodeURL(network));

  const client = new Avalanche(
    url.hostname,
    parseInt(url.port),
    url.protocol.replace(':', ''),
    AVALANCHE_NETWORK_ID,
    'X',
    'C',
    AVALANCHE_NETWORK_NAME,
  );

  client.setAuthToken(process.env.DATAHUB_AVALANCHE_API_KEY as string);

  return client;
};

const transactionUrl = (txId: string) => {
  return `https://explorer.avax-test.network/tx/${txId}`;
};

const getAvalancheInnerState = (state: GlobalStateT) => {
  const avalancheInnerState: any = {};
  const chainId = getCurrentChainId(state);
  const address = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  if (address) {
    avalancheInnerState.address = address;
  }
  const secret = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.METAMASK_NETWORK_NAME,
  );

  if (secret) {
    avalancheInnerState.secret = secret;
  }

  const network = getNetworkForCurrentChain(state);
  if (network) {
    avalancheInnerState.network = network;
  }

  return avalancheInnerState;
};

export {transactionUrl, getAvalancheClient, getAvalancheInnerState};
