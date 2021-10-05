export type AlertT = 'success' | 'info' | 'warning' | 'error' | undefined;

export type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};
