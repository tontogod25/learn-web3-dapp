import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'

type ReponseT = {
	secret: string
	address: string
}
export default function account(
	req: NextApiRequest,
	res: NextApiResponse<ReponseT>
) {
	const client = getAvalancheClient()
	const chain = client.XChain(); // the chainID can be altered if necessary, but we are on XChain here
	const keyChain = chain.keyChain(); // keyChain will be the returned instance of KeyChain from AVMAPI
	const key = keyChain.makeKey()
	console.log(key.getPrivateKeyString())
	console.log(key.getAddressString())
	res.status(200).json({
		secret: key.getPrivateKeyString(),
		address: key.getAddressString(),
	})
}
