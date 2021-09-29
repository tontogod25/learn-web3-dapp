import {BlockWithTransactions} from '@ethersproject/abstract-provider';
import {ChainType, StepType} from 'types';

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

// components : Layout
export interface StepButtonsI {
  next(): void;
  prev(): void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface StepI {
  step: StepType;
  isFirstStep: boolean;
  isLastStep: boolean;
  prev(): void;
  next(): void;
  body: JSX.Element;
  nav?: JSX.Element;
}

export interface SidebarI {
  steps: StepType[];
  stepIndex: number;
}

export interface AppI {
  chain: ChainType;
}
