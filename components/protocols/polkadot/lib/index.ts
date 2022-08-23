export const getNodeUrl = () => {
  return 'wss://westend-rpc.polkadot.io';
};

export const accountExplorer = (network: string) => (address: string) =>
  `https://westend.subscan.io/account/${address}`;

export const transactionUrl = (hash: string) =>
  `https://westend.subscan.io/extrinsic/${hash}`;

export const FAUCET_URL = `https://app.element.io/#/room/#westend_faucet:matrix.org`;
