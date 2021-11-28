import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-celo/lib';
import {newKit} from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {secret, newMessage, contract, address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);
    kit.addAccount(secret);

    // Create a new contract instance with the HelloWorld contract info
    const instance = undefined;
    // Call the setName function of our contract
    const txObject = undefined;
    // Send a transaction Object to modify the state of our contract
    let tx = undefined;

    let receipt = await tx.waitReceipt();

    res.status(200).json(receipt.transactionHash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
