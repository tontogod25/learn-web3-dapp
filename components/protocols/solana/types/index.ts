export type AlertT = 'success' | 'info' | 'warning' | 'error' | undefined;

export type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};

export type ErrorT = {
  message: string;
  file?: string;
  agrs?: string;
};

export type StepT = {
  validate: (n: number) => void;
};
