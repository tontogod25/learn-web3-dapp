import type { NextApiRequest, NextApiResponse } from 'next'
import { getSafeUrl } from '@ccelo/lib';
import { newKit } from '@celo/contractkit';
import HelloWorld from 'contracts/celo/HelloWorld.json';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    try {
        const { secret, newMessage, contractAddress } = req.body
        const url = getSafeUrl();
        const kit = newKit(url);

        const account = kit.web3.eth.accounts.privateKeyToAccount(secret)
        kit.addAccount(account.privateKey);

        // Create a new contract instance with the HelloWorld contract info
        const instance = new kit.web3.eth.Contract(
            // @ts-ignore
            HelloWorld.abi, 
            contractAddress
        )

        // Add your account to ContractKit to sign transactions
        // This account must have a CELO balance to pay tx fees, get some https://celo.org/build/faucet
        kit.connection.addAccount(account.privateKey)
        const txObject = await instance.methods.setName(newMessage)
        let tx = await kit.sendTransactionObject(txObject, { from: account.address })
    
        let receipt = await tx.waitReceipt()

        res.status(200).json(receipt.transactionHash)
    } catch(error) {
        console.error(error)
        res.status(500).json('Set message of contract failed')
    }
}
