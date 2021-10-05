import {CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS} from 'types';
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

export {
  getPolygonAddressExplorerURL,
  getPolygonTokenExplorerURL,
  getPolygonTxExplorerURL,
  getPolygonBlockExplorerURL,
  getNodeURL,
};
