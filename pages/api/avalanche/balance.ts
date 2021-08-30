import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'


type TransactionT = {
    txID: string,
    outputIndex: number
}

type BalanceT = {
    balance: string,
    utxoIDs: TransactionT[]
}
  
export default async function balance(
	req: NextApiRequest,
	res: NextApiResponse<string>
) {
    try {
        const { secret } = req.body
        const client = getAvalancheClient()
        const chain = client.XChain(); 
		const keychain = chain.keyChain()
		const key = keychain.importKey(secret)
		const address = key.getAddressString()
        const balance = await chain.getBalance(address, "AVAX") as BalanceT; 
        res.status(200).json(balance.balance)
    } catch(error) {
        console.error(error)
        res.status(500).json('failed to get balance')
    } 
}
