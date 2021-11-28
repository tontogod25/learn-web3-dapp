import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-celo/lib';
import {newKit} from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

type ResponseT = {
  address: string;
  hash: string;
};

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const {secret, address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    kit.addAccount(secret);

    // TODO: Create a transaction to deploy the contract

    const receipt = await tx.waitReceipt();

    res.status(200).json({
      address: receipt?.contractAddress as string,
      hash: receipt.transactionHash,
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
