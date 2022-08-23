export const getNodeUrl = () => {
  return 'https://hangzhounet.api.tez.ie';
};

export const accountExplorer = (network: string) => (address: string) =>
  `https://hangzhou.tzstats.com/${address}`;

export const transactionUrl = (hash: string) =>
  `https://hangzhou.tzstats.com/${hash}`;
