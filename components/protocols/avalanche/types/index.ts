export type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};

export type TransactionT = {
  txID: string;
  outputIndex: number;
};

export type BalanceT = {
  balance: string;
  utxoIDs: TransactionT[];
};
