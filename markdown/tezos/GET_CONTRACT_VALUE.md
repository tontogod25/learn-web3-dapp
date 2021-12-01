Our Contract is on-chain, and we're going to learn how to fetch the data stored on the contract.

{% hint style="info" %}
If you want to learn more about Tezos smart contracts, follow [**The Taco Shop Smart Contract**](https://ligolang.org/docs/tutorials/get-started/tezos-taco-shop-smart-contract) tutorial.
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/tezos/getter.ts`, implement the function and try to read the value of the counter stored in the smart contract. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {network, mnemonic, email, password, secret, contract} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    // Use the contract module to get the storage
    const counter = undefined;

    res.status(200).json(counter);
  }
//...
```

**Need some help?** Check out this link 👇

- [**Interface ContractProvider method `getStorage`**](https://tezostaquito.io/typedoc/interfaces/_taquito_taquito.contractprovider.html#getstorage)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {network, mnemonic, email, password, secret, contract} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    const counter = await tezos.contract.getStorage(contract);

    res.status(200).json(counter);
  }
//...
```

**What happened in the code above?**

- First, we create a new `TezosToolkit` instance.
- Next, we import our wallet data using `importKey`.
- Then, using the `getStorage` function of the `contract` module, we return the counter stored on the contract.
- Finally, we send the `counter` value converted `toString` back to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/tezos/getter.ts` is complete, click the **Get Counter** button to query the current value stored in the smart contract and display it on the page.

---

# 🏁 Conclusion

Nicely done! You learned how to get a value from a smart contract's storage on the Tezos blockchain. Now it is time for the final challenge: Modify the state of the contract and thus the state of the blockchain. Let's go!
