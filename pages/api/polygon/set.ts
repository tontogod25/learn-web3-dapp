import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
const fs = require('fs');

const mnemonic = fs.readFileSync(".secret").toString().trim();

export default async function query(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const signer = ethers.Wallet.fromMnemonic(mnemonic)
  const provider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com')
  const json = JSON.parse(fs.readFileSync('build/contracts/SimpleStorage.json').toString())
  const contract = new ethers.Contract(json.networks['80001'].address, json.abi, signer.connect(provider))

  console.log(req.body.amount)
  // contract.set(req.body.amount).then((receipt: any) => {
  contract.set(50).then((receipt: any) => {
    res
      .status(200)
      .json(receipt);
  })
}