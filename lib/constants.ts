import { ChainsType, CHAINS } from "types/types";

export const CHAINS_CONFIG: ChainsType = {
	[CHAINS.AVALANCHE]: {
		id: CHAINS.AVALANCHE,
		label: "Avalanche",
		active: false,
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
		active: false,
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
		active: false,
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
		active: false,
		logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to NEAR",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
            },
			{
				id: "keypair",
				title: "Generate a keypair",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
            },
			{
				id: "account",
				title: "Create an account",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
            },
			{
				id: "balance",
				title: "Get Account Balance",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
			},
			{
				id: "transfer",
				title: "Transfer some near",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
            },
			{
				id: "deploy",
				title: "Deploy a contract",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
            },
			{
				id: "call",
				title: "Call a contract",
				url: "https://learn.figment.io/network-documentation/near/near-pathway"
			},
        ],
	},
	[CHAINS.POLKADOT]: {
		id: CHAINS.POLKADOT,
		label: "Polkadot",
		active: false,
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
		active: false,
    logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Polygon",
				url: "https://learn.figment.io/network-documentation/matic/polygon-matic-pathway/connect-to-polygon"
			},
			{
				id: "query",
				title: "Query Polygon",
				url: "https://learn.figment.io/network-documentation/matic/polygon-matic-pathway/query-polygon"
			},
			{
				id: "balance",
				title: "Fund a Polygon account",
				url: "https://learn.figment.io/network-documentation/matic/polygon-matic-pathway/fund-a-polygon-account"
			},
			{
				id: "deploy",
				title: "Deploy a Solidity smart contract",
				url: "https://learn.figment.io/network-documentation/matic/polygon-matic-pathway/deploy-a-solidity-smart-contract"
			},
			{
				id: "call",
				title: "Call the smart contract",
				url: "https://learn.figment.io/network-documentation/matic/polygon-matic-pathway/call-the-smart-contract"
			},
		]
	},
	[CHAINS.SECRET]: {
		id: CHAINS.SECRET,
		label: "Secret",
		active: false,
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
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=010",
		active: false,
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
		logoUrl: "https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Tezos",
				url: ""
			},
			{
				id: "account",
				title: "Create an account",
				url: ""
			},
			{
				id: "balance",
				title: "Get balance",
				url: ""
			},
			{
				id: "transfer",
				title: "Transfer some Token",
				url: ""
			},
			{
				id: "deploy",
				title: "Deploy a Smart contract",
				url: ""
			},
			{
				id: "call",
				title: "interact with a contract",
				url: ""
			},
		]
	},
};
