export const getNodeUrl = () => {
  return 'https://alfajores-forno.celo-testnet.org';
};

export const transactionUrl = (hash: string) =>
  `https://alfajores-blockscout.celo-testnet.org/tx/${hash}`;

export const accountExplorer = (network: string) => (address: string) =>
  `https://alfajores-blockscout.celo-testnet.org/address/${address}`;
