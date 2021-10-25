import type {NextApiRequest, NextApiResponse} from 'next';
import {getAvalancheClient} from '@figment-avalanche/lib';
import {BinTools} from 'avalanche';
import {Address} from 'ethereumjs-util';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {secret, network} = req.body;
    const client = getAvalancheClient(network);

    // Initialize chain components
    const [xChain, cChain] = [client.XChain(), client.CChain()];
    const [xKeychain, cKeychain] = [xChain.keyChain(), cChain.keyChain()];
    const [xKeypair, cKeypair] = [
      xKeychain.importKey(secret),
      cKeychain.importKey(secret),
    ];
    const [cAddress] = [cKeypair.getAddressString()];

    // Get the real ID for X-Chain
    const xChainId = undefined;

    // Fetch UTXOs (unspent transaction outputs)
    const {utxos} = await cChain.getUTXOs(cAddress, xChainId);

    // Derive Eth-like address from the private key
    const binTools = BinTools.getInstance();
    const keyBuff = binTools.cb58Decode(secret.split('-')[1]);
    const ethAddr = Address.fromPrivateKey(
      Buffer.from(keyBuff.toString('hex'), 'hex'),
    ).toString();
    console.log('Ethereum-style address: ', ethAddr);

    // Generate an unsigned import transaction
    const importTx = await cChain.buildImportTx(undefined);

    // Sign and send import transaction
    const hash = await cChain.issueTx(importTx.sign(cKeychain));

    res.status(200).json(hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
