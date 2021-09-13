import {CHAINS, POLYGON_NETWORKS, POLYGON_PROTOCOLS} from 'types';
import {getDatahubNodeURL} from '@funnel/datahub';

export const getPolygonAddressExplorerURL = (address: string) => {
  return `https://mumbai.polygonscan.com/address/${address}`;
};

export const getPolygonBlockExplorerURL = (block: number) => {
  return `https://mumbai.polygonscan.com/block/${block}`;
};

export const getPolygonTxExplorerURL = (txId: string) => {
  return `https://mumbai.polygonscan.com/tx/${txId}`;
};

export const getPolygonTokenExplorerURL = (address: string) => {
  return `https://mumbai.polygonscan.com/token/${address}`;
};

export const getNodeURL = () =>
  getDatahubNodeURL(
    CHAINS.POLYGON,
    POLYGON_NETWORKS.TESTNET,
    POLYGON_PROTOCOLS.JSON_RPC,
  );
