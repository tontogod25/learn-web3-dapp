import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'
import { BinTools } from "avalanche";
import { Address } from 'ethereumjs-util'

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
        
        const sourceChain = await client.Info().getBlockchainID("X")

        // Fetch UTXOs (i.e unspent transaction outputs)
        const { utxos } = await cChain.getUTXOs(cKeychain.getAddressStrings(), sourceChain)
    
        // Generate an unsigned import transaction
        const importTx = await cChain.buildImportTx(
            utxos,
            ethAddr,
            cKeychain.getAddressStrings(),
            sourceChain,
            cKeychain.getAddressStrings()
        )
    
        // Sign and send import transaction
        const hash = await cChain.issueTx(importTx.sign(cKeychain))
        console.log("C-Chain import TX:", hash)
        console.log(` - https://explorer.avax-test.network/tx/${hash}`)

        res.status(200).json(hash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Import from X chain failed')
    } 
}
