import {ChainType} from 'types';

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

export type StepType = {
  id: string;
  title: string;
  url: string;
};

export type ErrorT = {
  message: string;
  file?: string;
  agrs?: string;
};

export type StepT = {
  validate: (n: number) => void;
};

export type QuoteSchemaT = {
  text: string;
  author: string;
};
