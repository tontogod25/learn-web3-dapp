import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'
import { BinTools, BN } from "avalanche";
import { Address } from 'ethereumjs-util'

// Prepare transaction details
const amount = "50000000" // Total amount we're transferring = 0.05 AVAX

export default async function account(
	req: NextApiRequest,
	res: NextApiResponse<string>
) {
    try {
        const { secret } = req.body
        const client = getAvalancheClient()
		const binTools = BinTools.getInstance()

        // Initialize chain components
        const xChain = client.XChain()
        const xKeychain = xChain.keyChain()
        xKeychain.importKey(secret)

        const cChain = client.CChain()
        const cKeychain = cChain.keyChain()
        cKeychain.importKey(secret)
        
        // Derive Eth-like address from the private key
        const keyBuff = binTools.cb58Decode(secret.split('-')[1])
        // @ts-ignore
        const ethAddr = Address.fromPrivateKey(Buffer.from(keyBuff, "hex")).toString("hex")
        console.log("Derived Eth address:", ethAddr)

        // Fetch UTXOs (i.e unspent transaction outputs)
        const utxos = (await xChain.getUTXOs(xKeychain.getAddressStrings())).utxos

        // Get the real ID for the destination chain
        const destinationChain = await client.Info().getBlockchainID("C")

        // Prepare the export transaction from X -> C chain
        const exportTx = await xChain.buildExportTx(
            utxos, // Unspent transaction outpouts
            new BN(amount), // Transfer amount
            destinationChain, // Target chain ID (for C-Chain)
            cKeychain.getAddressStrings(), // Addresses being used to send the funds from the UTXOs provided
            xKeychain.getAddressStrings(), // Addresses being used to send the funds from the UTXOs provided
            xKeychain.getAddressStrings(), // Addresses that can spend the change remaining from the spent UTXOs
        )

        // Sign and send the transaction
        const hash = await xChain.issueTx(exportTx.sign(xKeychain))
        console.log("X-Chain export TX:", hash)
        console.log(` - https://explorer.avax-test.network/tx/${hash}`)

        res.status(200).json(hash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Export to C chain failed')
    } 
}
