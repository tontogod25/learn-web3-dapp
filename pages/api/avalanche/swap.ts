import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'
import { BinTools, BN, Avalanche } from "avalanche";
import { AVMAPI, KeyChain as xKeychain } from 'avalanche/dist/apis/avm';
import { EVMAPI, KeyChain as cKeychain} from 'avalanche/dist/apis/evm';
import { Address } from 'ethereumjs-util'
// Prepare transaction details
const amount = "50000000" // Total amount we're transferring = 0.05 AVAX
const asset = "AVAX" // Primary asset used for the transaction (Avalanche supports many)

async function createExport(client:  Avalanche, xChain: AVMAPI, xKeychain: xKeychain, cKeychain: cKeychain) {
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
    const exportTxID = await xChain.issueTx(exportTx.sign(xKeychain))
    console.log("X-Chain export TX:", exportTxID)
    console.log(` - https://explorer.avax-test.network/tx/${exportTxID}`)
}

async function createImport(client:  Avalanche, cChain: EVMAPI, cKeychain: cKeychain, address: string) {
    // Get the real ID for the source chain
    const sourceChain = await client.Info().getBlockchainID("X")

    // Fetch UTXOs (i.e unspent transaction outputs)
    const { utxos } = await cChain.getUTXOs(cKeychain.getAddressStrings(), sourceChain)

    // Generate an unsigned import transaction
    const importTx = await cChain.buildImportTx(
        utxos,
        address,
        cKeychain.getAddressStrings(),
        sourceChain,
        cKeychain.getAddressStrings()
    )

    // Sign and send import transaction
    const importTX = await cChain.issueTx(importTx.sign(cKeychain))
    console.log("C-Chain import TX:", importTX)
    console.log(` - https://explorer.avax-test.network/tx/${importTX}`)
}

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
        const key = xKeychain.importKey(secret)

        const cChain = client.CChain()
        const cKeychain = cChain.keyChain()
        cKeychain.importKey(secret)
        
        // Derive Eth-like address from the private key
        const keyBuff = binTools.cb58Decode(secret.split('-')[1])
        // @ts-ignore
        const ethAddr = Address.fromPrivateKey(Buffer.from(keyBuff, "hex")).toString("hex")
        console.log("Derived Eth address:", ethAddr)
        
        // Create a X->C export transaction
        await createExport(client, xChain, xKeychain, cKeychain)

        await createImport(client, cChain, cKeychain, ethAddr)

        res.status(200).json('coucou')
    } catch(error) {
        console.error(error)
        res.status(500).json('failed to get balance')
    } 
}
