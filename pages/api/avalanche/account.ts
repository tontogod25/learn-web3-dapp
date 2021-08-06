import type { NextApiRequest, NextApiResponse } from 'next';
import { Avalanche } from 'avalanche';
import fs from 'fs';
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import { getDataHubAvalancheNodeUrl } from '@avalanche/lib';
import { getAvalancheClient } from '@avalanche/lib'
type Data = any;

export default function account(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const client = getAvalancheClient()
	const chain = client.XChain(); // the chainID can be altered if necessary, but we are on XChain here
	const keyChain = chain.keyChain(); // keyChain will be the returned instance of KeyChain from AVMAPI

	let key
	if (!fs.existsSync(keyPath)) {
		console.log("Generating a new keypair...")
		key = keyChain.makeKey()
		fs.writeFileSync(keyPath, key.getPrivateKeyString())
	} else {
		const buffer = fs.readFileSync(keyPath)
		console.log(`buffer`, buffer)
		const bufferStr = buffer.toString()

		if (bufferStr) {
			console.log("Loading keypair from saved private key...")
			key = keyChain.importKey(bufferStr)
		} else {
			console.log("Generating a new keypair...")
			key = keyChain.makeKey()
			fs.writeFileSync(keyPath, key.getPrivateKeyString())
		}
	}
	
	res.status(200).json({
		addressString: key.getAddressString(),
	});
}
