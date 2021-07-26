import { BN } from 'avalanche'

export type PolygonChainIdT = {
    chainId: number
}

export type PolygonQueryResponse = {
    chainName: string
    chainId: number
	blockHeight: number
    gasPriceAsGwei: string
}

export type PolygonQueryErrorResponse = {
    message: string
}
  

export type PolygonAccountT = string
