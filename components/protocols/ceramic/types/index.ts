export type EntryT = {
  msg: string;
  display?: (value: string) => string;
  value: string;
};

export type QuoteSchemaT = {
  text: string;
  author: string;
};

export enum IdxSchema {
  BasicProfile = 'basicProfile',
  Figment = 'figment',
}
