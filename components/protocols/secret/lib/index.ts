import {SECRET_NETWORKS} from 'types';

export const accountExplorer = (network: string) => (address: string) => {
  if (network === SECRET_NETWORKS.TESTNET) {
    return `https://secretnodes.com/secret/chains/pulsar-2/accounts/${address}`;
  } else {
    return `https://secretnodes.com/secret/chains/pulsar-2/account/${address}`;
  }
};

export const transactionUrl = (hash: string) =>
  `https://secretnodes.com/secret/chains/pulsar-2/transactions/${hash}`;

export const contractsUrl = (hash: string) =>
  `https://secretnodes.com/secret/chains/pulsar-2/contracts/${hash}`;

export const getNodeUrl = () => 'https://api.pulsar.griptapejs.com/';
