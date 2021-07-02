import { BN } from 'avalanche';

export type ConnectReponse = string

export type TransferReponse = {
	txID: string
}

export type TransferErrorResponse = {
	message: string
}

export type QueryResponseData = {
	pChainHeight: BN
	pChainMinStake: {
		minValidatorStake: BN
		minDelegatorStake: BN
	}
	pBlockchainId: string
	xBlockchainId: string
	cBlockchainId: string
	txFee: {
		txFee: BN
		creationTxFee: BN
	}
}

export type KeypairData = {
	addressString: string
}

export type TransactionIdentifier = {
	txID: string
}