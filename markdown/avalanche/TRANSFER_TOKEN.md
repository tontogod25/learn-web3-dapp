We already know that Avalanche is not your typical blockchain, with P/X/C chains supporting various operations. Each of these chains also has its own set of transaction types, however, we are looking to create a very simple one - a _token transfer_, and specifically on the X-Chain.

In simple terms: We will be sending some AVAX tokens from address A to address B to simulate a payment for goods/services.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/avalanche/transfer.ts`, implement the function and try to make your first transfer on the Avalanche network. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
  try {
    const {secret, navax, recipient, address, network} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const keychain = chain.keyChain();
    // Using keychain, load the private key to sign transactions
    undefined;

    // Fetch UTXOs (unspent transaction outputs)
    const { utxos } = undefined;

    // Determine the real asset ID from its symbol/alias
    const binTools = BinTools.getInstance();
    const assetInfo = await chain.getAssetDescription("AVAX");
    const assetID = binTools.cb58Encode(assetInfo.assetID);

    // Create a new transaction
    const transaction = await chain.buildBaseTx(undefined);

    // Sign the transaction and send it to the network
    undefined;
    undefined;

    res.status(200).json(hash);
  }
//...
```

**Need some help?** Check out these links

- [**Transfer example**](https://github.com/ava-labs/avalanchejs/tree/master/examples/avm)
- [**Manage X-Chain Keys**](https://docs.avax.network/build/tools/avalanchejs/manage-x-chain-keys)
- [**What The Heck is UTXO**](https://medium.com/bitbees/what-the-heck-is-utxo-ca68f2651819)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {secret, navax, recipient, address, network} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const keychain = chain.keyChain();
    keychain.importKey(secret);

    // Fetch UTXO (i.e unspent transaction outputs)
    const { utxos } = await chain.getUTXOs(address);

    // Determine the real asset ID from its symbol/alias
    // We can also get the primary asset ID with chain.getAVAXAssetID() call
    const binTools = BinTools.getInstance();
    const assetInfo = await chain.getAssetDescription("AVAX");
    const assetID = binTools.cb58Encode(assetInfo.assetID);

    // Create a new transaction
    const transaction = await chain.buildBaseTx(
      utxos, // Unspent transaction outputs
      new BN(navax), // Transaction amount, formatted as a BigNumber
      assetID, // AVAX asset
      [recipient], // Addresses we are sending the funds to (receiver)
      [address], // Addresses being used to send the funds from the UTXOs provided (sender)
      [address], // Addresses that can spend the change remaining from the spent UTXOs (payer)
    );

    // Sign the transaction and send it to the network
    const signedTx = transaction.sign(keychain);
    const hash = await chain.issueTx(signedTx);

    res.status(200).json(hash);
  }
//...
```

**What happened in the code above?**

- First, calling `importKey()` we pass the private key (`secret`), this allows the keypair to sign transactions.
- Next, we fetch the latest unspent transaction outputs with `getUTXOs`.
- Next, we determine the **assetID** using `BinTools.cb58Encode` method.
- Next, we build a base transaction using `buildBaseTx` passing:
  - The unspent outputs,
  - The transaction amount formatted as BigNumber,
  - The assetID,
  - The recipient address,
  - The sender address,
  - The payer address. Note that the sender and payer in this example are the same, but this is not required.
- Finally, we sign and send the transaction and return the transaction hash.

{% hint style="success" %}
A UTXO is an unspent transaction output. In an accepted transaction in a valid blockchain payment system, only unspent outputs can be used as inputs to a transaction. When a transaction takes place, inputs are deleted and outputs are created as new UTXOs that may then be consumed in future transactions.
{% endhint %}

{% hint style="tip" %}
Remember, the **AVAX** asset is using a 9-digit denomination and **AVAX** is the primary asset on the X-Chain.
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/avalanche/transfer.ts` is complete, Next.js will rebuild the API route. Now fill in the amount of **nAVAX** you want to send and then click on **Submit Transfer** to send the transaction to Avalanche.

---

# 🏁 Conclusion

We've learned how to prepare, sign and broadcast a simple transaction on Avalanche. With only a few lines of code, you can transfer funds on the network. AvalancheJS provides a range of examples on how to construct a transaction with more complex properties, for different use cases. In the next tutorial, we will examine the topic of cross-chain transfers.
