type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};

type TransactionT = {
  txID: string;
  outputIndex: number;
};

type BalanceT = {
  balance: string;
  utxoIDs: TransactionT[];
};

export type {BalanceT, EntryT};
