export const getNodeUrl = (network: string) =>
  network === 'Datahub'
    ? `https://celo-alfajores--rpc.datahub.figment.io/apikey/${process.env.DATAHUB_CELO_API_KEY}/`
    : 'https://alfajores-forno.celo-testnet.org';

export const transactionUrl = (hash: string) =>
  `https://alfajores-blockscout.celo-testnet.org/tx/${hash}`;

export const accountExplorer = (network: string) => (address: string) =>
  `https://alfajores-blockscout.celo-testnet.org/address/${address}`;
