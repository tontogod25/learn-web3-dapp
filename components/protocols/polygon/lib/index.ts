import {
  CHAINS,
  POLYGON_NETWORKS,
  POLYGON_PROTOCOLS,
  PROTOCOL_INNER_STATES_ID,
  GlobalStateT,
  InnerStateT,
} from 'types';
import {getCurrentChainId, getChainInnerState} from 'context';
import {getNodeURL as getNodeUrl} from 'utils/datahub';

const getPolygonAddressExplorerURL = (address: string) => {
  return `https://mumbai.polygonscan.com/address/${address}`;
};

const getPolygonBlockExplorerURL = (block: number) => {
  return `https://mumbai.polygonscan.com/block/${block}`;
};

const getPolygonTxExplorerURL = (txId: string) => {
  return `https://mumbai.polygonscan.com/tx/${txId}`;
};

const getPolygonTokenExplorerURL = (address: string) => {
  return `https://mumbai.polygonscan.com/token/${address}`;
};

const getNodeURL = (network?: string) =>
  getNodeUrl(
    CHAINS.POLYGON,
    POLYGON_NETWORKS.TESTNET,
    POLYGON_PROTOCOLS.JSON_RPC,
    network,
  );

const getPolygonInnerState = (state: GlobalStateT) => {
  const polygonInnerState: InnerStateT = {};
  const chainId = getCurrentChainId(state);
  const polygonAddress = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.ADDRESS,
  );

  if (polygonAddress) {
    polygonInnerState.ADDRESS = polygonAddress;
  }
  const metamaskNetworkName = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.METAMASK_NETWORK_NAME,
  );

  if (metamaskNetworkName) {
    polygonInnerState.METAMASK_NETWORK_NAME = metamaskNetworkName;
  }

  return polygonInnerState;
};

export {
  getPolygonAddressExplorerURL,
  getPolygonTokenExplorerURL,
  getPolygonTxExplorerURL,
  getPolygonBlockExplorerURL,
  getPolygonInnerState,
  getNodeURL,
};
