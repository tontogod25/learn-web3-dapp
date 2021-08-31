import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvalancheClient } from '@avalanche/lib'
import { BN } from "avalanche";

export default async function (
    req: NextApiRequest,
	res: NextApiResponse<string>
    ) {
    try {
        const { secret } = req.body
        const client = getAvalancheClient()
        const amount = "50000000" // Total amount we're transferring = 0.05 AVAX

        // Initialize chain components
        const [ xChain   , cChain    ] = [ client.XChain()            , client.CChain()             ];
        const [ xKeychain, cKeychain ] = [ xChain.keyChain()          , cChain.keyChain()           ];
        const [ xKeypair , cKeypair  ] = [ xKeychain.importKey(secret), cKeychain.importKey(secret) ];
        const [ xAddress , cAddress  ] = [ xKeypair.getAddressString(), cKeypair.getAddressString() ];

        // Fetch UTXOs (i.e unspent transaction outputs)
        const { utxos } = await xChain.getUTXOs(xAddress)

        // Get the real ID for the destination chain
        const cChainId = await client.Info().getBlockchainID("C")

        // Prepare the export transaction from X -> C chain
        const exportTx = await xChain.buildExportTx(
            utxos, // Unspent transaction outpouts
            new BN(amount), // Transfer amount
            cChainId, // Target chain ID (for C-Chain)
            [cAddress], // Addresses being used to send the funds from the UTXOs provided
            [xAddress], // Addresses being used to send the funds from the UTXOs provided
            [xAddress], // Addresses that can spend the change remaining from the spent UTXOs
        )

        // Sign and send the transaction
        const hash = await xChain.issueTx(exportTx.sign(xKeychain))

        res.status(200).json(hash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Export to C chain failed')
    } 
}
