import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'
import { BinTools } from "avalanche";
import { Address } from 'ethereumjs-util'

export default async function (
	req: NextApiRequest,
	res: NextApiResponse<string>
) {
    try {
        const { secret } = req.body
        const client = getAvalancheClient()
        
        // Initialize chain components
        const [ xChain   , cChain    ] = [ client.XChain()            , client.CChain()             ];
        const [ xKeychain, cKeychain ] = [ xChain.keyChain()          , cChain.keyChain()           ];
        const [ xKeypair , cKeypair  ] = [ xKeychain.importKey(secret), cKeychain.importKey(secret) ];
        const [ _xAddress, cAddress  ] = [ xKeypair.getAddressString(), cKeypair.getAddressString() ];

        // Get the real ID for X-Chain
        const xChainId = await client.Info().getBlockchainID("X");

        // Fetch UTXOs (i.e unspent transaction outputs)
        const { utxos } = await cChain.getUTXOs(cAddress, xChainId);

        // Derive Eth-like address from the private key
		const binTools = BinTools.getInstance();
        const keyBuff = binTools.cb58Decode(secret.split('-')[1]);
        // @ts-ignore
        const ethAddr = Address.fromPrivateKey(Buffer.from(keyBuff, "hex")).toString("hex");
        console.log("ethreum address: ", ethAddr);

        // Generate an unsigned import transaction
        const importTx = await cChain.buildImportTx(
            utxos,
            ethAddr,
            [cAddress],
            xChainId,
            [cAddress]
        )
    
        // Sign and send import transaction
        const hash = await cChain.issueTx(importTx.sign(cKeychain))

        res.status(200).json(hash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Import from X chain failed')
    } 
}
