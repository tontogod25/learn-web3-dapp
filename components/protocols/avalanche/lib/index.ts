import {CHAINS, AVALANCHE_NETWORKS} from 'types';
import {getNodeURL as getNodeUrl} from 'utils/datahub';
import {Avalanche} from 'avalanche';

const getNodeURL = (network?: string) =>
  getNodeUrl(CHAINS.POLYGON, AVALANCHE_NETWORKS.FUJI, undefined, network);

const getAvalancheClient = () => {
  const url = new URL(getNodeURL());

  const client = new Avalanche(
    url.hostname,
    parseInt(url.port),
    url.protocol.replace(':', ''),
    parseInt(process.env.AVALANCHE_NETWORK_ID as string),
    'X',
    'C',
    process.env.AVALANCHE_NETWORK_NAME,
  );

  client.setAuthToken(process.env.DATAHUB_AVALANCHE_API_KEY as string);

  return client;
};

const transactionUrl = (txId: string) => {
  return `https://explorer.avax-test.network/tx/${txId}`;
};

export {transactionUrl, getAvalancheClient};
