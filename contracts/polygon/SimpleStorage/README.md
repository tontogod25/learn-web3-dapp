Based on:

MetaCoin tutorial from Truffle docs https://www.trufflesuite.com/docs/truffle/quickstart
SimpleStorage example contract from Solidity docs https://docs.soliditylang.org/en/v0.4.24/introduction-to-smart-contracts.html#storage

1. Install truffle (https://www.trufflesuite.com/docs/truffle/getting-started/installation)
   `npm install -g truffle`

2. Navigate to this directory (/contracts/polygon/SimpleStorage)

3. Install dependencies
   `yarn`

4. Test contract
   `truffle test ./test/TestSimpleStorage.sol`

   **Possible issue:** "Something went wrong while attempting to connect to the network. Check your network configuration. Could not connect to your Ethereum client with the following parameters:"

   **Solution:** run `truffle develop` and make sure port matches the one in truffle-config.js under development and test networks

5. Run locally via `truffle develop`
   $ truffle develop

   ```
   migrate

   let instance = await SimpleStorage.deployed();

   let storedDataBefore = await instance.get();

   storedDataBefore.toNumber() // Should print 0

   instance.set(50);

   let storedDataAfter = await instance.get();

   storedDataAfter.toNumber() // Should print 50
   ```

6. Create Polygon testnet account

   - Install MetaMask (https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
   - Add a custom network with the following params:
     Network Name: "Polygon Mumbai"
     RPC URL: https://rpc-mumbai.maticvigil.com/
     Chain ID: 80001
     Currency Symbol: MATIC
     Block Explorer URL: https://mumbai.polygonscan.com

7. Fund your account from the Matic Faucet
   https://faucet.matic.network
   Select MATIC Token, Mumbai Network
   Enter your account address from MetaMask
   Wait until time limit is up, requests tokens 3-4 times so you have enough to deploy your contract

8. Add a `.secret` file in this directory with your account's seed phrase or mnemonic (you should be required to write this down or store it securely when creating your account in MetaMask). In `truffle-config.js`, uncomment the three constant declarations at the top, along with the matic section of the networks section of the configuration object.

9. Deploy contract
   `truffle migrate --network matic`

10. Interact via web3.js

    ```js
    const {ethers} = require('ethers');
    const fs = require('fs');
    const mnemonic = fs.readFileSync('.secret').toString().trim();
    const signer = new ethers.Wallet.fromMnemonic(mnemonic);
    const provider = new ethers.providers.JsonRpcProvider(
      'https://matic-mumbai.chainstacklabs.com',
    );
    const json = JSON.parse(
      fs.readFileSync('build/contracts/SimpleStorage.json').toString(),
    );
    const contract = new ethers.Contract(
      json.networks['80001'].address,
      json.abi,
      signer.connect(provider),
    );

    contract.get().then((val) => console.log(val.toNumber()));
    // should log 0

    contract.set(50).then((receipt) => console.log(receipt));

    contract.get().then((val) => console.log(val.toNumber()));
    // should log 50
    ```
