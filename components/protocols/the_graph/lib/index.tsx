import {ManifestStepStatusesT} from '@the-graph/types';

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

type WEI = string;
type ETH = string;
const toEther = (amountInWei: WEI): ETH => {
  // 1 ETH = 10**18 wei
  const DECIMAL_OFFSET = 10 ** 18;
  const centiEther = parseFloat(
    ((parseFloat(amountInWei) / DECIMAL_OFFSET) * 100).toFixed(),
  );
  return (centiEther / 100).toFixed(2);
};

const toDate = (timeStamp: number) =>
  new Date(timeStamp * 1000).toLocaleDateString();

export {getEtherScanContract, defaultStatus, toDate, toEther};
