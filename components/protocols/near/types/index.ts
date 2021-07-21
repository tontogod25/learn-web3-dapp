import type { Dispatch, SetStateAction } from 'react'
import { ChainType } from "types/types";

// api call
export type NearConnectReponse = string

// context stuff 
export type Action =
    | { type: 'SetNetworkId', networkId: string }
    | { type: 'SetAccountId', accountId: string | undefined }
    | { type: 'SetSecretKey', secretKey: string | undefined }
    | { type: 'SetContractId', contractId: string | undefined}

export type State = {
    networkId: string
    index: number
    accountId?: string
    secretKey?: string
    contractId?: string
}

// Components
export type CheckAccountIdT = {
    networkId: string
    freeAccountId: string
    setFreeAccountId: Dispatch<SetStateAction<string>>
    setIsFreeAccountId: Dispatch<SetStateAction<boolean>>
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