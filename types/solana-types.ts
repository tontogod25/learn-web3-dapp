import { Version } from "@solana/web3.js";

export type SolanaConnectResponse = Version
export type SolanaFundResponse = string

export type SolanaTransferErrorResponse = {
	message: string
}

export type SolanaBalanceResponse = number
export type SolanaBalanceErrorResponse = {
  message: string
}