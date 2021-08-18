import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'

type ReponseT = {
	secret: string
	address: string
}
export default function account(
	_req: NextApiRequest,
	res: NextApiResponse<ReponseT>
) {
	const client = getAvalancheClient()
	const chain = client.XChain(); 
	const keyChain = chain.keyChain(); 
	const keypair = keyChain.makeKey()
	const secret = keypair.getPrivateKeyString()
	const address = keypair.getAddressString()
	res.status(200).json({
		secret, address
	})
}
