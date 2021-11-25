import {getNodeURL as getNodeUrl} from 'utils/datahub';
import {CHAINS, AVALANCHE_NETWORKS} from 'types';
import {Avalanche} from 'avalanche';

const AVALANCHE_NETWORK_ID = 5;
const AVALANCHE_NETWORK_NAME = 'fuji';

export const getNodeURL = (network: string) =>
  getNodeUrl(CHAINS.AVALANCHE, AVALANCHE_NETWORKS.FUJI, undefined, network);

export const getAvalancheClient = (network: string) => {
  const url = new URL(getNodeURL(network));

  const client = new Avalanche(
    url.hostname,
    parseInt(url.port),
    url.protocol.replace(':', ''),
    AVALANCHE_NETWORK_ID,
    'X',
    'C',
    AVALANCHE_NETWORK_NAME,
  );

  client.setAuthToken(process.env.DATAHUB_AVALANCHE_API_KEY as string);

  return client;
};

export const transactionUrl = (txId: string) => {
  return `https://explorer.avax-test.network/tx/${txId}`;
};

export const accountExplorer = (network: string) => (address: string) => {
  return `https://explorer.avax-test.network/address/${address}`;
};
