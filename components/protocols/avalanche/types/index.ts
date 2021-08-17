import { BN } from 'avalanche';
import type { ChainType } from 'types/types';

export type AvalancheConnectResponse = string

export type AvalancheTransferResponse = {
	txID: string
}

export type AvalancheTransferErrorResponse = {
	message: string
}

export type AvalancheQueryResponse = {
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

export type AvalancheKeypairType = {
	addressString: string
}

export type AlertT = "success" | "info" | "warning" | "error" | undefined

export type EntryT = {
    msg: string
    display: (value: string) => string
    value: string
}

// components : Layout
export interface StepButtonsI {
	next(): void
	prev(): void
	isFirstStep: boolean
	isLastStep: boolean
}

export interface StepI {
	step: StepType
	isFirstStep: boolean
	isLastStep: boolean
	prev(): void
	next(): void
	body: JSX.Element
	nav?: JSX.Element
}

export interface SidebarI {
	steps: StepType[]
	stepIndex: number
}

export interface AppI {
    chain: ChainType
}

export type StepType = {
  id: string
  title: string
  url: string
}