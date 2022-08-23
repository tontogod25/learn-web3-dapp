Our Contract is on-chain, and we're going to learn how to fetch the data stored on the contract.

{% hint style="info" %}
If you want to learn more about Tezos smart contracts, follow [**The Taco Shop Smart Contract**](https://ligolang.org/docs/tutorials/get-started/tezos-taco-shop-smart-contract) tutorial.
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/tezos/setter.ts`, implement the function and try to increment the value stored in the smart contract by 1. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {network, mnemonic, email, password, secret, contract} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    const n = 1;
    // Load the interface of the contract
    const counterContract = undefined;
    // Call the increment function of the contract
    const transaction = await undefined;
    // Await confirmations
    await transaction.confirmation(3);

    res.status(200).json(transaction.hash);
  }
//...
```

**Need some help?** Check out these links 👇

- [**Interact with a smart contract**](https://tezostaquito.io/docs/quick_start/#interact-with-a-smart-contract)
- [**Interface ContractProvider method `at`**](https://tezostaquito.io/typedoc/interfaces/_taquito_taquito.contractprovider.html#at)
- [**Class ContractAbstraction `methods`**](https://tezostaquito.io/typedoc/classes/_taquito_taquito.contractabstraction.html#methods)

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

    const n = 1;
    // Load the interface of the contract
    const counterContract = await tezos.contract.at(contract);
    // Call the increment function of the contract
    const transaction = await counterContract.methods.increment(n).send();
    // Await confirmations
    await transaction.confirmation(3);

    res.status(200).json(transaction.hash);
  }
//...
```

**What happened in the code above?**

- First, we must supply the address of our newly deployed contract to `tezos.contract.at`.
- Next, using `contract.methods.increment(n).send()` will pass the value of `n` to the `increment` method of the deployed contract. Note: _if the contract functions are not annotated, they are still indexed by number._
- Next, using the instruction `transaction.confirmation(3)` we wait for **3** block confirmations before returning.
- Finally, the transaction hash is then available and we can return it to the client-side as JSON via `transaction.hash`.

---

# ✅ Make sure it works

Once the code in `pages/api/tezos/setter.ts` is complete, click **Increment the value** to send a transaction containing the call to the `increment` function. You will see the updated value on the page once the confirmations are received.

---

# 🏁 Conclusion

You have come all the way from connecting to Tezos to being able to deploy smart contracts. You are now empowered to keep learning and building on Tezos.
