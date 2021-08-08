export const VERSION = "0.0.1"
/*import type { NextApiRequest, NextApiResponse } from 'next';
const {ApiPromise, Keyring, WsProvider} = require('@polkadot/api');
const {mnemonicGenerate, mnemonicValidate} = require('@polkadot/util-crypto');

import { getDatahubNodeURL } from 'utils/datahub-utils';
import { CHAINS, POLKADOT_NETWORKS, POLKADOT_PROTOCOLS } from 'types/types';
import { PolkadotAccountResponse } from 'types/polkadot-types';

export default async function account(
	req: NextApiRequest,
	res: NextApiResponse<PolkadotAccountResponse>
) {
  const url = getDatahubNodeURL(CHAINS.POLKADOT, POLKADOT_NETWORKS.MAINNET, POLKADOT_PROTOCOLS.WS)
  const httpProvider = new WsProvider(url)
  const api = await ApiPromise.create({ provider: httpProvider })

  const keyring = new Keyring({ type: "sr25519" });

  // Create mnemonic string
  const mnemonic = mnemonicGenerate();
  console.log(`Generated mnemonic: ${mnemonic}`);

  // Validate the mnemonic string that was generated
  const isValidMnemonic = mnemonicValidate(mnemonic);
  console.log(`isValidMnemonic: ${isValidMnemonic}`);

  // Add an account derived from the mnemonic
  const account = keyring.addFromUri(mnemonic);
  console.log(`Address: ${account.address}`);
  console.log(`newAccount: ${JSON.stringify(account)}`);
	
	res.status(200).json({
    account,
    mnemonic,
	});
}
*/