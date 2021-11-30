export const getNodeUrl = (network: string) => {
  if (network === 'Datahub') {
    return `${process.env.TEZOS_DATAHUB_URL}/apikey/${process.env.DATAHUB_TEZOS_API_KEY}`;
  } else {
    return 'https://hangzhounet.api.tez.ie';
  }
};

export const accountExplorer = (network: string) => (address: string) =>
  `https://hangzhou.tzstats.com/${address}`;

export const transactionUrl = (hash: string) =>
  `https://hangzhou.tzstats.com/${hash}`;
