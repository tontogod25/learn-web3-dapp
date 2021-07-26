import { ChainsType, CHAINS } from "types/types";

export const CHAINS_CONFIG: ChainsType = {
	[CHAINS.AVALANCHE]: {
		id: CHAINS.AVALANCHE,
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
	[CHAINS.CELO]: {
		id: CHAINS.CELO,
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
	[CHAINS.THE_GRAPH]: {
		id: CHAINS.THE_GRAPH,
		label: "The Graph",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/the-graph-grt-logo.svg?v=012",
		steps: [
			{
				id: "connect",
				title: "Deploy a smart contract",
				url: ""
			},
		]
	},
	[CHAINS.NEAR]: {
		id: CHAINS.NEAR,
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
	[CHAINS.POLKADOT]: {
		id: CHAINS.POLKADOT,
		label: "Polkadot",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Polkadot",
				url: ""
			},
			{
				id: "query",
				title: "Query Polkadot",
				url: ""
			},
			{
				id: "account",
				title: "Create an account",
				url: ""
			},
		]
	},
	[CHAINS.POLYGON]: {
		id: CHAINS.POLYGON,
		label: "Polygon",
		active: true,
		logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to the Polygon testnet network",
				url: "https://app.gitbook.com/@figment-learn/s/pathway-sandbox/polygon-matic-pathway/connect-to-polygon"
			},
			{
				id: "query",
				title: "Query Polygon for information",
				url: "https://app.gitbook.com/@figment-learn/s/pathway-sandbox/polygon-matic-pathway/query-polygon"
			},
			{
				id: "fund",
				title: "Fund your Polygon account",
				url: "https://app.gitbook.com/@figment-learn/s/pathway-sandbox/polygon-matic-pathway/get-matic-tokens-on-mumbai"
			}
		]
	},
	[CHAINS.SECRET]: {
		id: CHAINS.SECRET,
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
	[CHAINS.SOLANA]: {
		id: CHAINS.SOLANA,
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
	[CHAINS.TEZOS]: {
		id: CHAINS.TEZOS,
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