import { Avalanche } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';

import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = any

export default async function query(
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

	// Initialize client connections to each Avalanche chain
	const info = client.Info()
	const pChain = client.PChain()
	const xChain = client.XChain()
	const cChain = client.CChain()
	
	// Fetch current height, blockchain IDs, bootstrap status and fees
	console.log("================== InfoAPI ==================");
	const height = await pChain.getHeight()
	console.log("Current height:", 
		height.toString(10)
	)
	console.log("- PChain:", 
		await info.getBlockchainID("P"), 
		await info.isBootstrapped("P")
	)
	console.log("- XChain:",
		await info.getBlockchainID("X"), 
		await info.isBootstrapped("X")
	)
	console.log("- CChain:", 
		await info.getBlockchainID("C"), 
		await info.isBootstrapped("C")
	)
	console.log("- Fees:", 
		await info.getTxFee()
	)

	// info.peers mass outputs
	// console.log("- Peers:", 
	// 	await info.peers()
	// )

	// Fetch current minimum staking amount for running a validator
	const minStake = await pChain.getMinStake()
	console.log("Current min stake:", 
		minStake.minValidatorStake.toString(10)
	)

	// Fetch current supply
	const supply = await pChain.getCurrentSupply()
	console.log("Current supply:", 
		supply.toString(10)
	)

	console.log("================== XChain ==================");
	const fee = await xChain.getDefaultTxFee()
	console.log("Default Fee:", fee.toString(10))
	const status = await xChain.getTxStatus("2AjbGiRg1KG7FtuJqVEtCzi48n8jpwWdLLYwnBxfFCwMozMLMg")
	console.log("Transaction status:", status)
	const balances = await xChain.getAllBalances("X-fuji1h4646056wc84fr7jlmmx7t6u3e348ehwzefl5u")
	console.log("Balances:", balances)	

	
	console.log("================== PChain ==================");
	console.log("Fetching validators...")
	const {validators} = await pChain.getCurrentValidators()
	console.log("Found validators:", validators.length)
	console.log("Example validator:", validators[0])
	const validator = validators[0]
	const ownerBalance = await pChain.getBalance(validator.rewardOwner.addresses[0])
	console.log("Validator owner balance:", ownerBalance.balance)
	console.log("Fetching validator subnets...")
	const subnets = await pChain.getSubnets()
	console.log("Found subnets:", subnets.length)
	console.log("Subnet example:", subnets[0])
	
	// TODO: Property 'data' does not exist on type 'NextApiResponse<any>'. ts(2339)
	// It will 500 error without res.data
	res.status(200)
		 .json(res.data);
}
