import type {Dispatch, SetStateAction} from 'react';

// Components
export type CheckAccountIdT = {
  NETWORK: string;
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
