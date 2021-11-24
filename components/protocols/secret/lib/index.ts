import {SECRET_NETWORKS} from 'types';
import {CosmWasmClient} from 'secretjs';

// export const getDataHubSecretNodeUrl = `https://${process.env.DATAHUB_SECRET_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`;

export const accountExplorer = (network: string) => (address: string) => {
  if (network === SECRET_NETWORKS.TESTNET) {
    return `https://secretnodes.com/secret/chains/supernova-2/accounts/${address}`;
  } else {
    return `https://secretnodes.com/secret/chains/supernova-2/account/${address}`;
  }
};

export const transactionUrl = (hash: string) =>
  `https://secretnodes.com/secret/chains/supernova-2/transactions/${hash}`;

export const contractsUrl = (hash: string) =>
  `https://secretnodes.com/secret/chains/supernova-2/contracts/${hash}`;

/*
export const getSecretTestnetUrl = () => {
  return 'https://chainofsecrets.secrettestnet.io/';
};
*/

export const getNodeUrl = () => 'http://bootstrap.supernova.enigma.co:1317';
