import { Version } from "@solana/web3.js";

export type SolanaConnectReponse = Version
export type SolanaFundReponse = string

export type SolanaTransferErrorResponse = {
	message: string
}

export type SolanaBalanceReponse = number
export type SolanaBalanceErrorResponse = {
  message: string
}