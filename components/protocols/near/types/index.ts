import type {Dispatch, SetStateAction} from 'react';
import {ChainType, StepType} from 'types';

// Components
export type CheckAccountIdT = {
  network: string;
  freeAccountId: string;
  setFreeAccountId: Dispatch<SetStateAction<string>>;
  setIsFreeAccountId: Dispatch<SetStateAction<boolean>>;
};

export type AlertT = 'success' | 'info' | 'warning' | 'error' | undefined;

export type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};

// Components : Layout
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
