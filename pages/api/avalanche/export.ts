import type {NextApiRequest, NextApiResponse} from 'next';
import {getAvalancheClient} from '@figment-avalanche/lib';
import {BN} from 'avalanche';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {secret, network} = req.body;
    const client = getAvalancheClient(network);

    // Total amount we're transferring = 0.05 AVAX
    const amount = '50000000';

    // Taking inspiration for xChain do the same for cChain
    const [xChain, cChain] = [client.XChain(), undefined];
    const [xKeychain, cKeychain] = [xChain.keyChain(), undefined];
    const [xKeypair, cKeypair] = [xKeychain.importKey(secret), undefined];
    const [xAddress, cAddress] = [xKeypair.getAddressString(), undefined];

    // Fetch UTXOs (unspent transaction outputs)
    const {utxos} = await xChain.getUTXOs(xAddress);

    // Get the real ID for the cChain
    const chainId = undefined;

    // Prepare the export transaction from X -> C chain
    const exportTx = await xChain.buildExportTx(undefined);

    // Sign and send the transaction
    const hash = await xChain.issueTx(exportTx.sign(xKeychain));

    res.status(200).json(hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
