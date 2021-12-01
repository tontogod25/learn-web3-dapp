import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {getNodeUrl} from '@figment-tezos/lib';
import {importKey} from '@taquito/signer';
import {CONTRACT_JSON} from 'contracts/tezos/counter.js';

type ResponseT = {
  contractAddress: string;
  hash: string;
};
export default async function deploy(
  req: NextApiRequest,
  res: NextApiResponse<ResponseT | string>,
) {
  try {
    const {mnemonic, email, password, secret, network} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    const operation = await undefined;

    const contract = await undefined;

    res.status(200).json({
      contractAddress: contract.address,
      hash: operation.hash
    });
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
