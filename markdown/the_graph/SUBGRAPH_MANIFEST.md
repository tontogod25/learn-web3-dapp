## 📜 What's a "manifest"?

Like an orchestra, your subgraph is made up of a bunch of pieces that need to play nicely together for the music to sound good. Think of the the manifest as the conductor: it sits in the middle and coordinates everything.

If you open the repository in a code editor like Visual Studio Code, look for the folder called `subgraphs` and its child `punks`. It should look like this below. The manifest is the file called `subgraph.yaml`.

![SG folder](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/the-graph/manifest-01.png)

## 🔎 Inspecting the scaffolded file

Open the `subgraph.yaml` file and notice that it's already been populated using the information we provided but also with A LOT of things we didn't specify.

![Manifest file](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/the-graph/manifest-02.png)

Under the `mappings` key we find `entities` and `eventHandlers` - the next steps of this tutorial will be dedicated to understanding them a bit more in depth. For now just notice the information that's below them. Remember the [code](https://etherscan.io/address/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB#code) from the CryptoPunk contract on Etherscan? They correspond to the Events emitted! The `eventHandlers` even have the right signatures already. That's promising.

## 🧑🏼‍💻 Your turn! Edit the manifest

Edit the manifest file to accomplish the 3 following things:

1. **Specify a starting block at `13100000`.** In order to save time when indexing the datasource, we must specify a starting block (or else the node would start indexing from the genesis block, which would take a veeeeery long time).
2. **Define only two entities "Punk" and "Account"** under the dataSources mappings.
3. **Only handle the `PunkBought` event** and name its handler `handlePunkBought`

## 😅 Solution

Replace the existing contents of `subgraph.yaml` with the following code snippet:

```yaml
// solution
specVersion: 0.0.2
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: Contract
    network: mainnet
    source:
      address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
      abi: Contract
      startBlock: 13100000
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.5
      language: wasm/assemblyscript
      entities:
        - Account
        - Punk
      abis:
        - name: Contract
          file: ./abis/Contract.json
      eventHandlers:
        - event: PunkBought(indexed uint256,uint256,indexed address,indexed address)
          handler: handlePunkBought
      file: ./src/mapping.ts
```

## 💡 A word about ABIs

When another smart contract or external application wants to call a smart contract function, it needs to know how to interact with the contract's interface. And since in practice an Ethereum smart contract is deployed on the blockchain as byte code, we need a better way to tell consumers how to invoke the contract and what to expect back.

This is what ABIs (Application Binary Interface) are for! They define the methods and structures that can be used to interact with that binary contract and what shape of data you'll get back.

You can read more about ABIs in the [Solidity docs](https://docs.soliditylang.org/en/latest/abi-spec.html), or check out this [Quicknode article](https://www.quicknode.com/guides/solidity/what-is-an-abi) on the topic.

## ✅ Make sure it works

Now, it's time for you to verify if you have followed the instructions carefully, click on the button **Test Manifest** to check that your manifest is well formed.
