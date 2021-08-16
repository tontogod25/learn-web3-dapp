export type PolkadotConnectResponse = string
export type PolkadotConnectErrorResponse = {
  message: string
}

export type PolkadotQueryResponse = {
  genesisHash: string
  libVersion: string
  chain: string
  nodeName: string
  nodeVersion: string
  lastHeaderNumber: string
  lastHeaderHash: string
}

export type PolkadotQueryErrorResponse = {
  message: string
}

export type PolkadotAccountResponse = {
  address: string
  mnemonic: string
  jsonWallet: string
}

export type PolkadotAccount = {
  address: string
  addressRaw: any
  publicKey: any
  type: string
}

export type PolkadotKeypairType = {
  account: PolkadotAccount
  mnemonic: string
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

export type ChainType = {
    id: any
    label: string
    active: boolean
    logoUrl: string
    steps: StepType[]
  }
  