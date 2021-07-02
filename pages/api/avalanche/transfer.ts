import { Avalanche, BinTools, BN } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

import { getDatahubNodeURL } from 'utils/datahub-utils';
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import { getAvalancheClient } from 'utils/avalanche-utils';

type Data = any

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const client = getAvalancheClient()
	const credentialsPath = './credentials'
	const bintools = BinTools.getInstance();

	// Initialize client connection and keychain
	const chain = client.XChain()
	const keychain = chain.keyChain()

	// Import X-chain key from the previously created file
	const file = fs.readFileSync(`${credentialsPath}/avalanche_keypair.json`)
	const data = JSON.parse(file)
	const keyImport = keychain.importKey(data.privkey)

	// Fetch UTXO ( unspent transaction outputs)
	const address = keyImport.getAddressString()
	const { utxos } = await chain.getUTXOs(address)

	// Prepare transaction details
	const receiver = req.body.to // Pathway test receiver address
	const amount = req.body.amount // Total amount we're transferring = 0.05 AVAX
	const asset = "AVAX" // Primary asset used for the transaction (Avalanche supports many)

	// Determine the real asset ID from its symbol/alias
	// We can also get the primary asset ID with chain.getAVAXAssetID() call
	const assetInfo = await chain.getAssetDescription(asset)
	const assetID = bintools.cb58Encode(assetInfo.assetID)

	// Fetch our current balance
	let balance = await chain.getBalance(address, assetID)
	console.log("Balance before sending tx:", balance)

	// Generate a new transaction
	const unsignedTx = await chain.buildBaseTx(
		utxos, // unspent outputs
  	new BN(amount), // transaction amount formatted as a BigNumber
  	assetID, // AVAX asset
  	[receiver], // addresses to send the funds
  	[address], // addresses being used to send the funds from the UTXOs provided
  	[address], // addresses that can spend the change remaining from the spent UTXOs
  	bintools.stringToBuffer("Figment Pathway") // memo, totally optional
	)

	// Generate a signed transaction
	const signedTx = unsignedTx.sign(keychain)

	// Send transaction to network
	const txID = await chain.issueTx(signedTx)
	console.log("Transaction submitted!")
	console.log("----------------------------------------------------------------")
	console.log(`Visit https://explorer.avax-test.network/tx/${txID} to see transaction details`)
	console.log("----------------------------------------------------------------")

	res.status(200).json({
		 txID, 
	})
}
