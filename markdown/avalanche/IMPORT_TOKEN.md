Since Avalanche operates on 3 chains (X/P/C), it allows users to transfer tokens in each direction.

AVAX tokens exist on the X-Chain, where they can be traded, on the P-Chain, where they can be provided as a stake when validating the Primary Network, and on the C-Chain, where they can be used in smart contracts or to pay for gas fees. Avalanche supports movement of AVAX between these chains. We'll be concentrating our efforts on X->C swaps, with C-Chain being used for smart contract deployments.

Inter-chain transfers are performed via a 2-step process:

- Create the X-Chain export transaction
- Create the C-Chain import transaction -> (this tutorial)

Here we will focus on the second part, the **C-Chain import transaction**.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/avalanche/import.ts`, implement the function and try to import the AVAX sent in the previous tutorial to C-Chain. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {secret, network} = req.body;
    const client = getAvalancheClient(network);

    // Initialize chain components
    const [ xChain   , cChain    ] = [ client.XChain()            , client.CChain()             ];
    const [ xKeychain, cKeychain ] = [ xChain.keyChain()          , cChain.keyChain()           ];
    const [ xKeypair , cKeypair  ] = [ xKeychain.importKey(secret), cKeychain.importKey(secret) ];
    const [ cAddress ] = [ cKeypair.getAddressString() ];

    // Get the real ID for X-Chain
    const xChainId = undefined;

    // Fetch UTXOs (unspent transaction outputs)
    const { utxos } = await cChain.getUTXOs(cAddress, xChainId);

    // Derive Eth-like address from the private key
    const binTools = BinTools.getInstance();
    const keyBuff = binTools.cb58Decode(secret.split('-')[1]);
    const ethAddr = Address.fromPrivateKey(
      Buffer.from(keyBuff.toString('hex'), 'hex'),
    ).toString();
    console.log("Ethereum-style address: ", ethAddr);

    // Generate an unsigned import transaction
    const importTx = await cChain.buildImportTx(undefined);

    // Sign and send import transaction
    const hash = await cChain.issueTx(importTx.sign(cKeychain));

    res.status(200).json(hash)
  }
//...
```

**Need some help?** Check out these links 👇

- [**Code examples**](https://github.com/ava-labs/avalanchejs/tree/master/examples/avm)
- [**Manage X-Chain Keys**](https://docs.avax.network/build/tools/avalanchejs/manage-x-chain-keys)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {secret, network} = req.body;
    const client = getAvalancheClient(network);

    // Initialize chain components
    const [ xChain   , cChain    ] = [ client.XChain()            , client.CChain()             ];
    const [ xKeychain, cKeychain ] = [ xChain.keyChain()          , cChain.keyChain()           ];
    const [ xKeypair , cKeypair  ] = [ xKeychain.importKey(secret), cKeychain.importKey(secret) ];
    const [ cAddress ] = [ cKeypair.getAddressString() ];

    // Get the real ID for X-Chain
    const xChainId = await client.Info().getBlockchainID("X");

    // Fetch UTXOs (i.e unspent transaction outputs)
    const { utxos } = await cChain.getUTXOs(cAddress, xChainId);

    // Derive Eth-like address from the private key
    const binTools = BinTools.getInstance();
    const keyBuff = binTools.cb58Decode(secret.split('-')[1]);
    const ethAddr = Address.fromPrivateKey(
      Buffer.from(keyBuff.toString('hex'), 'hex'),
    ).toString();
    console.log("Ethereum-style address: ", ethAddr);

    // Generate an unsigned import transaction
    const importTx = await cChain.buildImportTx(
        utxos,
        ethAddr,
        [cAddress],
        xChainId,
        [cAddress]
    )

    // Sign and send import transaction
    const hash = await cChain.issueTx(importTx.sign(cKeychain));

    res.status(200).json(hash);
  }
//...
```

**What happened in the code above?**

- First, we need to build our C-Chain keypair. This works exactly the same way for X-Chain.
- Next, we determine the chainId.
- Next, we fetch the latest `UTXOS`.
- Next, as we're working on an EVM compatible blockchain (C-Chain understands Solidity smart contracts), we need to deduce the Ethereum-style address from the private key.
- Next, we build our transaction the same way as for a simple transfer:
  - There is no amount, as we're importing an already existing amount.
  - The destination address is in Ethereum format as we're working on an EVM compatible chain.
- Finally, we sign and send the transaction and return the transaction hash.

---

# ✅ Make sure it works

Once the code in `pages/api/avalanche/import.ts` is complete, Next.js will rebuild the API route. Click on **Import 0.05 AVAX** and you should see the balance displayed on the page.

---

# 🏁 Conclusion

Congratulations, you've made it this far and successfully completed an AVAX transfer from the X-Chain to the C-Chain. The same approach works in reverse (C-Chain -> X-Chain), or for any other inter-chain transfers (X-Chain -> P-Chain or P-Chain -> C-Chain for example).
