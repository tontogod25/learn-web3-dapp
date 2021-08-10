
import type { NextApiRequest, NextApiResponse } from 'next'
import { SECRET_NETWORKS } from 'types/types';
import { getDataHubSecretNodeUrl, getSafeUrl } from 'components/protocols/secret/lib';
import { EnigmaUtils, SigningCosmWasmClient, Secp256k1Pen, pubkeyToAddress, encodeSecp256k1Pubkey, } from 'secretjs';
import fs from 'fs'

const CONTRACT_PATH = './contracts/secret/contract.wasm' 

const customFees = {
    upload: {
      amount: [{ amount: '2000000', denom: 'uscrt' }],
      gas: '2000000',
    },
    init: {
      amount: [{ amount: '500000', denom: 'uscrt' }],
      gas: '500000',
    },
    exec: {
      amount: [{ amount: '500000', denom: 'uscrt' }],
      gas: '500000',
    },
    send: {
      amount: [{ amount: '80000', denom: 'uscrt' }],
      gas: '80000',
    },
  };

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const url = getSafeUrl()
        const { mnemonic }= req.body
        console.log(url)
        console.log(mnemonic)

        const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic)
        const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
        const address = pubkeyToAddress(pubkey, 'secret');

        // 1. Initialise client
        const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
        const client = new SigningCosmWasmClient(
            url,
            address,
            (signBytes) => signingPen.sign(signBytes),
            txEncryptionSeed, customFees,
          );

        // 2. Upload the contract wasm
        const wasm = fs.readFileSync(CONTRACT_PATH);
        console.log('Uploading contract');
        const uploadReceipt = await client.upload(wasm, {})
        
        console.log('Transaction: ', uploadReceipt);

        res.status(200).json(uploadReceipt.transactionHash)
    } catch(error) {
        console.log(error)
        res.status(500).json('transfert failed')
    }
}
