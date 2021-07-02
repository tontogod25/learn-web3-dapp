import type { NextApiRequest, NextApiResponse } from 'next';
import { Avalanche } from 'avalanche';
import fs from 'fs';

import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';
import { getAvalancheClient } from 'utils/avalanche-utils'
type Data = any;

export default function account(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const client = getAvalancheClient()

	// Define the path where our keypair will be saved in JSON format
	const credentialsPath = './credentials'
	const keyPath = `${credentialsPath}/avalanche_keypair.json`
	const chain = client.XChain(); // the chainID can be altered if necessary, but we are on XChain here
	const keyChain = chain.keyChain(); // keyChain will be the returned instance of KeyChain from AVMAPI

	// Check if we already have an existing keypair
	if (!fs.existsSync(keyPath)) {
		console.log("Generating a new keypair...")
		const key = keyChain.makeKey()

		console.log("Saving keypair to", keyPath)
		fs.writeFileSync(keyPath, JSON.stringify({
			pubkey: key.getPublicKeyString(),
			privkey: key.getPrivateKeyString(),
		}, null, 2))
	} else {
		console.log(`${keyPath} exists! Importing...`)
		const data = JSON.parse(fs.readFileSync(keyPath))
		const keyImport = keyChain.importKey(data.privkey)
		const addressString = keyImport.getAddressString()
		console.log("Imported X-chain address:", keyImport.getAddressString())
		
		res.status(200).json({
			addressString,
		});
	}

}
