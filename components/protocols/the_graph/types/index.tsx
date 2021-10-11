type ErrorT = {
  message: string;
  file?: string;
  args?: string;
};

type EntryT = {
  msg: string;
  display: (value: string) => string;
  value: string;
};

type sourceT = {
  address: string;
  abi: string;
  startBlock: number;
};

type eventHandlersT = {
  event: string;
  handler: string;
};

type mappingT = {
  kind: string;
  apiVersion: string;
  language: string;
  entities: string[];
  abis: any;
  eventHandlers: eventHandlersT[];
  file: string;
};

type dataSourcesT = {
  kind: string;
  name: string;
  network: string;
  source: sourceT;
  mapping: mappingT;
};

type manifestT = {
  specVersion: string;
  schema: any;
  dataSources: dataSourcesT[];
};

export type ManifestStepStatusesT = {
  block: ManifestStepStatusT;
  entities: ManifestStepStatusT;
  eventHandlers: ManifestStepStatusT;
};

type StatusMessageT =
  | 'Valid startBlock'
  | 'Valid entities'
  | 'Valid eventHandlers'
  | 'Invalid startBlock'
  | 'Invalid entities'
  | 'Invalid eventHandlers';

export type ManifestStepStatusT = {
  valid: boolean;
  message: StatusMessageT;
};

type PunkdataT = {
  id: any;
  index: any;
  owner?: {id: string};
  value: any;
  date: any;
  svgString?: string;
  traits?: string;
};

export type {ErrorT, EntryT, manifestT, PunkdataT};
