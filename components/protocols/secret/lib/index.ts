import {SECRET_NETWORKS} from 'types';
import {CosmWasmClient} from 'secretjs';

export const getDataHubSecretNodeUrl = (network: SECRET_NETWORKS): string => {
  return network === SECRET_NETWORKS.MAINNET
    ? `https://${process.env.DATAHUB_SECRET_MAINNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`
    : `https://${process.env.DATAHUB_SECRET_TESTNET_RPC_URL}/apikey/${process.env.DATAHUB_SECRET_API_KEY}/`;
};

export const transactionUrl = (hash: string) =>
  `https://secretnodes.com/secret/chains/supernova-2/transactions/${hash}`;

export const contractsUrl = (hash: string) =>
  `https://secretnodes.com/secret/chains/supernova-2/contracts/${hash}`;

export const getSecretTestnetUrl = () => {
  return 'https://chainofsecrets.secrettestnet.io/';
};

export const getSafeUrl = async (force = true): Promise<string> => {
  if (force) return getSecretTestnetUrl();
  const url = getDataHubSecretNodeUrl(SECRET_NETWORKS.TESTNET);
  const client = new CosmWasmClient(url);
  try {
    const nonce = await client.getChainId();
    console.log('connected to testnet figment DATAHUB');
    return url;
  } catch (err) {
    console.log('connected to secret testnet network');
    return getSecretTestnetUrl();
  }
};
