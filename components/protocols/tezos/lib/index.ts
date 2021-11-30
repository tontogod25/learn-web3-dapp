export const getNodeUrl = (network: string) => {
  if (network === 'Datahub') {
    return `${process.env.TEZOS_DATAHUB_URL}/apikey/${process.env.DATAHUB_TEZOS_API_KEY}`;
  } else {
    return 'https://api.tez.ie/rpc/florencenet';
  }
};

export const accountExplorer = (network: string) => (address: string) =>
  `https://florencenet.tzkt.io/${address}`;

export const transactionUrl = (hash: string) =>
  `https://florencenet.tzkt.io/${hash}`;
