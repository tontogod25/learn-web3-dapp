Since Avalanche operates on 3 chains (X/P/C), it allows users to transfer tokens in each direction.

AVAX tokens exist on the X-Chain, where they can be traded; on the P-Chain, where they can be provided as a stake when validating the Primary Network; and on the C-Chain, where they can be used in smart contracts or to pay for gas fees. Avalanche supports movement of AVAX between these chains. We'll be concentrating our efforts on X->C swaps, since the C-Chain is used for smart contract deployments.

Inter-chain transfers are performed via a 2-step process:

- Create the X-Chain export transaction -> (this tutorial)
- Create the C-Chain import transaction

Here we will focus on the first part, the **X-Chain export transaction**.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/avalanche/export.ts`, implement the function and try to create an export transaction from X-Chain to C-Chain. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {secret, network} = req.body;
    const client = getAvalancheClient(network);

    // Total amount we're transferring = 0.05 AVAX
    const amount = "50000000";

    // Taking inspiration for xChain do the same for cChain
    const [ xChain   , cChain    ] = [ client.XChain()            , undefined ];
    const [ xKeychain, cKeychain ] = [ xChain.keyChain()          , undefined ];
    const [ xKeypair , cKeypair  ] = [ xKeychain.importKey(secret), undefined ];
    const [ xAddress , cAddress  ] = [ xKeypair.getAddressString(), undefined ];

    // Fetch UTXOs (unspent transaction outputs)
    const { utxos } = await xChain.getUTXOs(xAddress)

    // Get the real ID for the cChain
    const chainId = undefined;

    // Prepare the export transaction from X -> C chain
    const exportTx = await xChain.buildExportTx(undefined)

    // Sign and send the transaction
    const hash = await xChain.issueTx(exportTx.sign(xKeychain))

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
    // Total amount we're transferring = 0.05 AVAX
    const amount = "50000000";

    // Initialize chain components
    const [ xChain   , cChain    ] = [ client.XChain()            , client.CChain()             ];
    const [ xKeychain, cKeychain ] = [ xChain.keyChain()          , cChain.keyChain()           ];
    const [ xKeypair , cKeypair  ] = [ xKeychain.importKey(secret), cKeychain.importKey(secret) ];
    const [ xAddress , cAddress  ] = [ xKeypair.getAddressString(), cKeypair.getAddressString() ];

    // Get the real ID for the destination chain
    const chainId = await client.Info().getBlockchainID("C");

    // Fetch UTXOs (i.e unspent transaction outputs)
    const { utxos } = await xChain.getUTXOs(xAddress);

    // Prepare the export transaction from X -> C chain
    const exportTx = await xChain.buildExportTx(
        utxos, // Unspent transaction outputs
        new BN(amount), // Transfer amount
        chainId, // Target chain ID (for C-Chain)
        [cAddress], // Addresses being used to send the funds from the UTXOs provided
        [xAddress], // Addresses being used to send the funds from the UTXOs provided
        [xAddress], // Addresses that can spend the change remaining from the spent UTXOs
    )

    // Sign and send the transaction
    const hash = await xChain.issueTx(exportTx.sign(xKeychain));

    res.status(200).json(hash);
  }
//...
```

**What happened in the code above?**

- First, we need to build our C-Chain keypair. This works exactly the same way for X-Chain.
- Next, we determine the chainId.
- Next, we build our transaction the same way as for a simple **AVAX** transfer:
  - `cAddress` replacing `sender`.
  - `chainId` replacing `assetId`.
- Finally, we sign and send the transaction and return the transaction hash.

---

# ✅ Make sure it works

Once the code in `pages/api/avalanche/export.ts` is complete, Next.js will rebuild the API route. Click on **Export 0.05 AVAX** and you should see the balance displayed on the page.

---

# 🏁 Conclusion

Our next topic is to process the import of the cross-chain transfer. Time to import the AVAX we just sent to C-Chain. Let's go!
