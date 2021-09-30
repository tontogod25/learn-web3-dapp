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
