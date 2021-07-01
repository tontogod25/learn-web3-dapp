import { Avalanche, BinTools, BN } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import fs from 'fs';

import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = any

export default async function transaction(
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
	client.setAuthToken(process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY as string)

	const credentialsPath = './credentials'
	const bintools = BinTools.getInstance();

	// Initialize client connections and keychain
	const info = client.Info()
	const chain = client.XChain()
	const keychain = chain.keyChain()

	// Import X-chain key from the previously created file
	const file = fs.readFileSync(`${credentialsPath}/avalanche_keypair.json`)
	const data = JSON.parse(file)
	const keyImport = keychain.importKey(data.privkey)

	// Fetch UTXO (i.e unspent transaction outputs)
	const address = keyImport.getAddressString()
	const { utxos } = await chain.getUTXOs(address)

	// Prepare transaction details
	const receiver = "X-fuji1j2zasjlkkvptegp6dpm222q6sn02k0rp9fj92d" // Pathway test receiver address
	const amount = "50000000" // Total amount we're transferring = 0.05 AVAX
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

	// Check transaction status
	let status = await chain.getTxStatus(txID)
	console.log("Current transaction status:", status)

	// Wait 2s
	setTimeout(async function() {
  	// Check status again
  	status = await chain.getTxStatus(txID)
  	console.log("Updated transaction status:", status)

  	// Final balance check
 	 	balance = await chain.getBalance(address, assetID)
  	console.log("Balance after sending tx:", balance)
	}, 2000)
	
	// TODO: Property 'data' does not exist on type 'NextApiResponse<any>'. ts(2339)
	// It will 500 error without res.data in some cases - RX
	res.status(200).json(res.data);
}
