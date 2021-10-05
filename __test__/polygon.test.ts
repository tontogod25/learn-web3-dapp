import {getNodeURL} from 'components/protocols/polygon/lib';
import {ethers} from 'ethers';
import dotenv from 'dotenv';

dotenv.config({path: '.env.local'});

// Avoid jest open handle error
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000));
});

async function query_step() {
  const url = getNodeURL();
  const provider = new ethers.providers.JsonRpcProvider(url, 'any');
  const blockHeight = await provider.getBlockNumber();
  const blockInfo = await provider.getBlockWithTransactions(blockHeight);
  return {blockInfo};
}

describe('Polygon backend tests', () => {
  // Avoid jest open handle error
  jest.setTimeout(30000);

  test('Query step', async () => {
    await expect(query_step()).resolves.toHaveProperty('blockInfo.number');
  });
});
