import type {NextApiRequest, NextApiResponse} from 'next';
import {Keyring} from '@polkadot/api';

export default async function restore(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {mnemonic} = req.body;
    const keyring = undefined;
    const account = undefined;
    const address = undefined;
    res.status(200).json(address);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
