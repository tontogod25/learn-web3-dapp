import { Avalanche, BN } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';

import { getDatahubNodeURL } from 'utils/datahub-utils';
import { QueryResponseData } from "types/response-types"
import { getAvalancheClient } from 'utils/avalanche-utils';

export default async function query(
  req: NextApiRequest,
  res: NextApiResponse<QueryResponseData>
) {
	const client = getAvalancheClient()
	const info = client.Info()
	const pChain = client.PChain()
	const xChain = client.XChain()
	
	// Fetch blockchain details
	const pChainHeight = await pChain.getHeight()
	const pChainMinStake = await pChain.getMinStake()

	const pBlockchainId = await info.getBlockchainID("P")
	const xBlockchainId = await info.getBlockchainID("X")
	const cBlockchainId = await info.getBlockchainID("C")
	const txFee = await info.getTxFee()

	res.status(200)
		.json({
			pBlockchainId,
			pChainHeight,
			pChainMinStake,
			xBlockchainId,
			cBlockchainId,
			txFee,
		});


	// // Fetch current minimum staking amount for running a validator
	// const minStake = await pChain.getMinStake()
	// console.log("Current min stake:", 
	// 	minStake.minValidatorStake
	// )

	// // Returns an upper bound on the amount of tokens that exist.
	// // Not monotonically increasing because this number can go down if a staker's reward is denied.
	// const supply = await pChain.getCurrentSupply()
	// console.log("Current supply:", 
	// 	supply
	// )

	// console.log("================== XChain ==================");
	// const fee = await xChain.getDefaultTxFee()
	// console.log("Default Fee:",
	//  fee
	// )
	// const status = await xChain.getTxStatus("2AjbGiRg1KG7FtuJqVEtCzi48n8jpwWdLLYwnBxfFCwMozMLMg")
	// console.log("Transaction status:", status)
	// const balances = await xChain.getAllBalances("X-fuji1h4646056wc84fr7jlmmx7t6u3e348ehwzefl5u")
	// console.log("Balances:", balances)

	// console.log("================== PChain ==================");
	// console.log("Fetching validators...")
	// const {validators} = await pChain.getCurrentValidators()
	// console.log("Found validators:", validators.length)
	// console.log("Example validator:", validators[0])
	// const validator = validators[0]
	// const ownerBalance = await pChain.getBalance(validator.rewardOwner.addresses[0])
	// console.log("Validator owner balance:", ownerBalance.balance)
	// console.log("Fetching validator subnets...")
	// const subnets = await pChain.getSubnets()
	// console.log("Found subnets:", subnets.length)
	// console.log("Subnet example:", subnets[0])

}
