import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'
import { BinTools, BN } from "avalanche";


export default async function account(
	req: NextApiRequest,
	res: NextApiResponse<string>
) {
    try {
        const { secret, amount } = req.body
        const client = getAvalancheClient()
        const chain = client.XChain(); 
		const keychain = chain.keyChain()
		const key = keychain.importKey(secret)

		// constants
		const receiver = "X-fuji1j2zasjlkkvptegp6dpm222q6sn02k0rp9fj92d" 
		const asset = "AVAX" 
		
		// Fetch UTXO (i.e unspent transaction outputs)
		const address = key.getAddressString()
		const { utxos } = await chain.getUTXOs(address)

		// Determine the real asset ID from its symbol/alias
		// We can also get the primary asset ID with chain.getAVAXAssetID() call
		const binTools = BinTools.getInstance()
		const assetInfo = await chain.getAssetDescription(asset)
		const assetID = binTools.cb58Encode(assetInfo.assetID)

		// Generate a new transaction
		const transaction = await chain.buildBaseTx(
			utxos, // unspent outputs	
			new BN(amount), // transaction amount formatted as a BigNumber
			assetID, // AVAX asset
			[receiver], // addresses to send the funds
			[address], // addresses being used to send the funds from the UTXOs provided
			[address], // addresses that can spend the change remaining from the spent UTXOs
		)

		// Generate a signed transaction
		const signedTx = transaction.sign(keychain)
		const hash = await chain.issueTx(signedTx)
		console.log(`Visit https://explorer.avax-test.network/tx/${hash} to see transaction details`)

        res.status(200).json(hash)
    } catch(error) {
        console.error(error)
        res.status(500).json('failed to get balance')
    } 
}
