import {ManifestStepStatusesT} from '@the-graph/types';

const prettyError = (error: any) => {
  return {
    message: error?.response?.data ?? 'Unknown message',
    file: error?.config?.url ?? 'Unknown file',
    args: error?.config?.data
      ? JSON.parse(error.config.data)
      : {error: 'Unknown'},
  };
};

const getEtherScanContract = (address: string) => {
  1;
  return `https://etherscan.io/address/${address}`;
};

const defaultStatus: ManifestStepStatusesT = {
  block: {
    valid: false,
    message: 'Invalid startBlock',
  },
  entities: {
    valid: false,
    message: 'Invalid entities',
  },
  eventHandlers: {
    valid: false,
    message: 'Invalid eventHandlers',
  },
};

export {prettyError, getEtherScanContract, defaultStatus};
