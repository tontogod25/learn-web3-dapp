import {ManifestStepStatusesT, EntityStepStatusesT} from '@the-graph/types';

export const getEtherScanContract = (address: string) => {
  return `https://etherscan.io/address/${address}`;
};

export const defaultManifestStatus: ManifestStepStatusesT = {
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

export const defaultEntityStatus: EntityStepStatusesT = {
  entities: {
    valid: false,
    message: 'Too many entities',
  },
  account: {
    valid: false,
    message: 'Account entity is missing',
  },
  punk: {
    valid: false,
    message: 'Punk entity is missing',
  },
};

type WEI = string;
type ETH = string;
export const toEther = (amountInWei: WEI): ETH => {
  // 1 ETH = 10**18 wei
  const DECIMAL_OFFSET = 10 ** 18;
  const centiEther = parseFloat(
    ((parseFloat(amountInWei) / DECIMAL_OFFSET) * 100).toFixed(),
  );
  return (centiEther / 100).toFixed(2);
};

export const toDate = (timeStamp: number) =>
  new Date(timeStamp * 1000).toLocaleDateString();
