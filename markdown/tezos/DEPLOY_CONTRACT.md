Although it is beyond the scope of this tutorial to teach the specific syntax of LIGO or Michelson, we will cover the deployment of compiled Michelson code to Tezos. Michelson is a human-readable, stack-based language. It is possible to write smart contracts in Michelson & it can also be compiled directly from LIGO.

{% hint style="info" %}
One of the properties of Michelson is that it has been designed to facilitate formal verification. Further reading on the specifics of formal verification is [available here](https://runtimeverification.com/blog/formal-verification-framework-for-michelson/)
{% endhint %}

We won't go through the process of reviewing the smart contract code base, compiling it or testing it. We will focus instead on how one can deploy a smart contract using the **Taquito** library. To do this, we're going to use a pre-compiled smart contract, you can find the compiled Michelson code under `contracts/tezos/counter.js`.

Our contract will be pretty basic. It stores a counter on the blockchain and implements two functions:

- The `Increment(n)` function which increases by n the counter stored on the contract.
- The `Decrement(n)` function which decreases by n the counter stored on the contract.

{% hint style="info" %}
If you want to learn more about Tezos smart contracts, follow [**The Taco Shop Smart Contract**](https://ligolang.org/docs/tutorials/get-started/tezos-taco-shop-smart-contract) tutorial on the official LIGO site.
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/tezos/deploy.ts`, implement the function and try to deploy the compiled smart contract. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {mnemonic, email, password, secret, network} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    const operation = await undefined;

    const contract = await undefined;

    res.status(200).json({
      contractAddress: contract.address,
      hash: operation.hash
    });
  }
//...
```

**Need some help?** Check out these links 👇

- [**Interface ContractProvider method `originate`**](https://tezostaquito.io/typedoc/interfaces/_taquito_taquito.contractprovider.html#originate)
- [**Class OriginateOperation method `contract`**](https://tezostaquito.io/typedoc/classes/_taquito_taquito.originationoperation.html#contract)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {mnemonic, email, password, secret, network} = req.body;
    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    const operation = await tezos.contract.originate({
        code: CONTRACT_JSON,
        storage: 0
      })

    const contract = await operation.contract()

    res.status(200).json({
      contractAddress: contract.address,
      hash: operation.hash
    });
  }
//...
```

**What happened in the code above?**

- First, we create a new `TezosToolkit` instance.
- `importKey` has the side effect of setting the TezosToolkit instance to use the `InMemorySigner` provider.
- Next, we execute the `Tezos.contract.originate` function. This deploys the Michelson contract code to the Tezos blockchain, from the `CONTRACT_JSON` in `counter.js`. The storage property is also set to `0`.
- Next, the resulting operation ([`op`](https://opentezos.com/tezos-basics/operations/)) object is used to provide the contract address of the newly originated contract.

---

# ✅ Make sure it works

Once the code in `pages/api/tezos/deploy.ts` is complete, click on **Deploy the contract** to send the compiled smart contract to the network.

---

# 🏁 Conclusion

Now that we have deployed a smart contract on Tezos, let's interact with it! In the following tutorials, we will look at how to use both view and change functions.
