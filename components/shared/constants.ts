import { ChainsType } from "types/types";

export const CHAINS: ChainsType = {
	AVALANCHE: {
		id: "avalanche",
		label: "Avalanche",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Avalanche",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/1.-connect-to-avalanche-node-with-datahub"
			},
			{
				id: "account",
				title: "Create a Keypair",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/2.-create-your-first-avalanche-account"
			},
			{
				id: "query",
				title: "Query Avalanche",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/3.-query-the-avalanche-network"
			},
			{
				id: "transferX",
				title: "Transfer AVAX on the X Chain",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/4.-create-your-first-transaction"
			},
		]
	},
	CELO: {
		id: "celo",
		label: "Celo",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/celo-celo-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Celo",
				url: ""
			},
		]
	},
	NEAR: {
		id: "near",
		label: "NEAR",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to NEAR",
				url: ""
			},
		]
	},
	POLKADOT: {
		id: "polkadot",
		label: "Polkadot",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Polkadot",
				url: ""
			},
		]
	},
	POLYGON: {
		id: "polygon",
		label: "Polygon",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to the Matic testnet network",
				url: ""
			}
		]
	},
	SECRET: {
		id: "secret",
		label: "Secret",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/secret-scrt-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Secret",
				url: ""
			},
		]
	},
	SOLANA: {
		id: "solana",
		label: "Solana",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to the Solana devnet cluster",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/connect"
			},
			{
				id: "account",
				title: "Create an Account/Keypair",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/keypair"
			},
			{
				id: "fund",
				title: "Fund the account with SOL",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/fund"
			},
			{
				id: "balance",
				title: "Check your account's balance",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/balance"
			},
			{
				id: "transfer",
				title: "Transfer SOL tokens between accounts",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/transfer"
			},
			{
				id: "deploy",
				title: "Deploy a Program",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/deploy"
			},
			{
				id: "call",
				title: "Call a Program",
				url: "https://learn.figment.io/network-documentation/solana/solana-pathway/call"
			},
		]
	},
	TEZOS: {
		id: "tezos",
		label: "Tezos",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Tezos",
				url: ""
			},
		]
	},
}