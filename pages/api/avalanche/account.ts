import type { NextApiRequest, NextApiResponse } from 'next';
import { Avalanche } from 'avalanche';
import fs from 'fs';

import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = any;

export default function account(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const datahubUrl = getDatahubNodeURL(CHAINS.AVALANCHE, AVALANCHE_NETWORKS.FUJI);
	const url = new URL(datahubUrl);

	const client = new Avalanche(
		url.hostname,
		parseInt(url.port),
		url.protocol.replace(":", ""),
		parseInt(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK_ID as string),
		"X",
		"C",
		process.env.NEXT_PUBLIC_AVALANCHE_NETWORK_NAME
	);  

	// Apply DataHub API authentication token
	client.setAuthToken(process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY as string);

	// Define the path where our keypair will be saved in JSON format
	const credentialsPath = './credentials'
	const keyPath = `${credentialsPath}/avalanche_privkey.json`
	const chain = client.XChain(); // the chainID can be altered if necessary, but we are on XChain here
	const keyChain = chain.keyChain(); // keyChain will be the returned instance of KeyChain from AVMAPI

	let key
	if (!fs.existsSync(keyPath)) {
		console.log("Generating a new keypair...")
		key = keyChain.makeKey()
		fs.writeFileSync(keyPath, key.getPrivateKeyString())
	} else {
		const buffer = fs.readFileSync(keyPath)
		const data = JSON.parse(buffer.toString())

		if (data) {
			console.log("Loading keypair from saved private key...")
			key = keyChain.importKey(data)
		} else {
			console.log("Generating a new keypair...")
			key = keyChain.makeKey()
		}
	}
	
	res.status(200).json({
		addressString: key.getAddressString(),
	});
}
