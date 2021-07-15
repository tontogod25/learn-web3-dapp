Based on:

MetaCoin tutorial from Truffle docs https://www.trufflesuite.com/docs/truffle/quickstart
SimpleStorage example contract from Solidity docs https://docs.soliditylang.org/en/v0.4.24/introduction-to-smart-contracts.html#storage

1. Set up truffle (https://www.trufflesuite.com/docs/truffle/quickstart)
2. Write contract
      see contracts/SimpleStorage.sol
3. Test contract
      issue: "Something went wrong while attempting to connect to the network. Check your network configuration. Could not connect to your Ethereum client with the following parameters:"
      solution: run `truffle develop` and make sure port matches the one in truffle-config.js under development and test networks
4. Run locally via `truffle develop`
      $ truffle develop

      ```
      migrate

      let instance = await SimpleStorage.deployed();

      instance.set(50);

      let storedData = await instance.get();

      storedData.toNumber()
      ```
5. Create Polygon account
      * Install MetaMask
      * Add a custom network with the following params:
        Network Name: "Polygon Mumbai"
        RPC URL: https://rpc-mumbai.maticvigil.com/
        Chain ID: 80001
        Currency Symbol: MATIC
        Block Explorer URL: https://mumbai.polygonscan.com
6. Fund account
      https://faucet.matic.network
      Select MATIC Token, Mumbai Network
      Enter your account address from MetaMask
      Wait until time limit is up, requests tokens 3-4 times so you have enough to deploy your contract
7. Deploy contract
      add matic as a network in truffle-config:

      ```js
      matic:  {
         provider: () => new HDWalletProvider({
           mnemonic: {
             phrase: mnemonic
           },
           providerOrUrl:  `https://matic-mumbai.chainstacklabs.com`,
           chainId: 80001
         }),
         network_id: 80001,
         confirmations: 2,
         timeoutBlocks: 200,
         skipDryRun: true,
         chainId: 80001
       }
     }
     ```

     then run truffle migrate --network matic
8. Interact via web3.js
      ```js
      const Web3 = require('web3')
      const rpc = `https://matic-mumbai.chainstacklabs.com`
      const client = new Web3(rpc)

      const contractAddress = '0xf7edDa225CfCE3245aF14a8E41B72CE4c623e3be'
      // find this in ./build/contracts/SimpleStorage.json
      const abi = [
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "uint256",
              "name": "x",
              "type": "uint256"
            }
          ],
          "name": "set",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "get",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]

      const contract = new client.eth.Contract(abi, contractAddress)
      contract.methods.get().call().then(val => console.log(val))

      contract.methods.set(20).send({ from: '0x0DB939D9E17379f5a76E5b816d05a3d4eA969eBB' })
      ```
