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
				id: "balance",
				title: "Get the balance",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/3.-query-the-avalanche-network"
			},
			{
				id: "transfer",
				title: "Transfer some AVAX",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/3.-query-the-avalanche-network"
			},
			{
				id: "export",
				title: "Export Token from X-Chain to C-Chain",
				url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/4.-create-your-first-transaction"
			},
			{
				id: "import",
				title: "Import Token from X-Chain to C-Chain",
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
				url: "https://learn2.figment.io/pathways/celo-pathway"
			},
			{
				id: "account",
				title: "Creacte an account",
				url: "https://learn2.figment.io/pathways/celo-pathway"
			},
			{
				id: "balance",
				title: "Get the balance",
				url: "https://learn2.figment.io/pathways/celo-pathway"
			},
			{
				id: "transfer",
				title: "Transfer some Token",
				url: "https://learn2.figment.io/pathways/celo-pathway"
			},
			{
				id: "change",
				title: "Change cUSD to CELO",
				url: "https://learn2.figment.io/pathways/celo-pathway"
			},
			{
				id: "deploy",
				title: "Deploy a smart contract",
				url: "https://learn2.figment.io/pathways/celo-pathway"
			},
			{
				id: "interact",
				title: "Interact with contract",
				url: "https://learn2.figment.io/pathways/celo-pathway"
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
		active: true,
		logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010",
		steps: [
			{
				id: "connect",
				title: "Connect to Polkadot",
				url: ""
			},
			{
				id: "account",
				title: "Create an account",
				url: ""
			},
			{
				id: "restore",
				title: "Restore an account",
				url: ""
			},
			{
				id: "balance",
				title: "Get the Balance",
				url: ""
			},
			{
				id: "transfer",
				title: "Transfer some Token",
				url: ""
			},
			{
				id: "estimate",
				title: "Estimate transaction fees",
				url: ""
			}
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
				title: "Connect to Polygon",
				url: "https://learn2.figment.io/tutorials/connect-to-polygon"
			},
			{
				id: "query",
				title: "Query Polygon",
				url: "https://learn2.figment.io/tutorials/query-polygon"
			},
			{
				id: "restore",
				title: "Restore your account",
				url: "https://learn2.figment.io/tutorials/restore-from-mnemonic"
			},
			{
				id: "balance",
				title: "Fund a Polygon account",
				url: "https://learn2.figment.io/tutorials/fund-a-polygon-account"
			},
			{
				id: "transfer",
				title: "Transfer some MATIC",
				url: "https://learn2.figment.io/tutorials/transfer-some-matic"
			},
			{
				id: "deploy",
				title: "Deploy a Solidity smart contract",
				url: "https://learn2.figment.io/tutorials/deploy-a-solidity-smart-contract"
			},
			{
				id: "setter",
				title: "Set the storage of the contract",
				url: "https://learn2.figment.io/tutorials/set-contract-storage"
			},
			{
				id: "getter",
				title: "Get the storage of the contract",
				url: "https://learn2.figment.io/tutorials/get-contract-storage"
			},

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
			{
				id: "account",
				title: "Get an Account",
				url: ""
			},
			{
				id: "balance",
				title: "Get the Balance",
				url: ""
			},
			{
				id: "transfer",
				title: "Transfer SCRT",
				url: ""
			},
			{
				id: "deploy",
				title: "Deploy a contract",
				url: ""
			},
			{
				id: "call",
				title: "Call the smart contract",
				url: ""
			},
		]
	},
	[CHAINS.SOLANA]: {
		id: CHAINS.SOLANA,
		label: "Solana",
    	logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=010",
		active: true,
		steps: [
			{
				id: "connect",
				title: "Connect to the Solana devnet cluster",
				url: "https://learn2.figment.io/tutorials/connect-to-devnet"
			},
			{
				id: "account",
				title: "Create an Account/Keypair",
				url: "https://learn2.figment.io/tutorials/create-solana-keypair"
			},
			{
				id: "fund",
				title: "Fund the account with SOL",
				url: "https://learn2.figment.io/tutorials/fund-solana-account"
			},
			{
				id: "balance",
				title: "Check your account's balance",
				url: "https://learn2.figment.io/tutorials/check-solana-account-balance"
			},
			{
				id: "transfer",
				title: "Transfer SOL tokens between accounts",
				url: "https://learn2.figment.io/tutorials/transfer-sol-tokens"
			},
			{
				id: "deploy",
				title: "Deploy the Program",
				url: "https://learn2.figment.io/tutorials/deploy-solana-program"
			},
			{
				id: "greeter",
				title: "Create a Storage for the Program",
				url: "https://learn2.figment.io/tutorials/how-to-store-state"
			},
			{
				id: "getter",
				title: "Get the greeting counter",
				url: "https://learn2.figment.io/tutorials/get-greetings"
			},
			{
				id: "setter",
				title: "Send a greeting to program",
				url: "https://learn2.figment.io/tutorials/send-greetings"
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
