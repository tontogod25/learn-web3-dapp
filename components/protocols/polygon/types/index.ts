import {BlockWithTransactions} from '@ethersproject/abstract-provider';

export type PolygonChainIdT = {
  chainId: number;
};

export type PolygonQueryResponse = {
  networkName: string;
  chainId: number;
  blockHeight: number;
  gasPriceAsGwei: string;
  blockInfo: BlockWithTransactions;
};

export type PolygonQueryErrorResponse = {
  message: string;
};

export type PolygonAccountT = string | null;

export type AlertT = 'success' | 'info' | 'warning' | 'error' | undefined;

export type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};
