import {Avalanche} from 'avalanche';

const AVALANCHE_NETWORK_ID = 5;
const AVALANCHE_NETWORK_NAME = 'fuji';

export const getNodeURL = (network: string) => {
  if (network === 'Testnet') {
    return 'https://api.avax-test.network';
  } else {
    return `https://${process.env.AVALANCHE_DATAHUB_URL}/apikey/${process.env.DATAHUB_AVALANCHE_API_KEY}`;
  }
};

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
