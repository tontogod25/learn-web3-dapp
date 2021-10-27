A faucet is a way for users to acquire some amount of tokens on a blockchain, typically on a test network, such as the Florence testnet for Tezos. The tokens from the faucet we will be using in this step are not equivalent to the tez on mainnet - there is a difference in how the accounts are derived.

Take all available precautions when dealing with crypto assets. Keeping mnemonic seed phrases and private cryptographic keys safe is an important consideration when dealing with any blockchain, Tezos is no exception.

{% hint style="info" %}
Visit the [faucet](https://faucet.tzalpha.net/) to generate a mnemonic and get some testnet ꜩ (tez).
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/tezos/account.ts`, implement the function and try to activate your first account on the Tezos network. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const { mnemonic, email, password, secret } = req.body;
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    // call the importKey method
    undefined;

    res.status(200).json('Activation of the account ok');
  }
//...
```

**Need some help?** Check out these links 👇

- [**method `importKey`**](https://tezostaquito.io/typedoc/modules/_taquito_signer.html#importkey)
- [**Importing a Faucet Key**](https://tezostaquito.io/docs/quick_start/#importing-a-faucet-key)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const { mnemonic, email, password, secret } = req.body
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);

    await importKey(
      tezos,
      email,
      password,
      mnemonic,
      secret
    )

    res.status(200).json('Activation of the account ok');
  }
//...
```

**What happened in the code above?**

- First, we create a new `TezosToolkit` instance.
- Next, we call the `importKey` method in order to activate the account.

---

# ✅ Make sure it works

Once the code is complete and the file has been saved:

- Copy/paste the faucet information
- Click on **Feed the storage**
- Click on **Activate account**

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/tezos/tezos-account.gif)

---

# 🏁 Conclusion

Nice work! You now have a Tezos account on the Florence testnet. In the next tutorial, we will query a Tezos node using DataHub, to determine the current balance of our account.
