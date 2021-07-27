import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'
const fs = require('fs');

const mnemonic = "film dilemma neither setup save vanish empower ripple mask artwork glue canoe"

export default async function query(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const signer = ethers.Wallet.fromMnemonic(mnemonic)
  const provider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com')
  const json = JSON.parse(fs.readFileSync('build/contracts/SimpleStorage.json').toString())
  const contract = new ethers.Contract(json.networks['80001'].address, json.abi, signer.connect(provider))

  contract.get().then((val: any) => {
    res
      .status(200)
      .json(val.toNumber());
  })
}