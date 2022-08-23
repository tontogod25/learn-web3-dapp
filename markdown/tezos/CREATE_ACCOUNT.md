A faucet is a way for users to acquire some amount of tokens on a blockchain, typically on a test network, such as the Florence testnet for Tezos. The tokens from the faucet we will be using in this step are not equivalent to the tez on mainnet - there is a difference in how the accounts are derived.

Take all available precautions when dealing with crypto assets. Keeping mnemonic seed phrases and private cryptographic keys safe is an important consideration when dealing with any blockchain, Tezos is no exception.

{% hint style="info" %}
Visit the [faucet](https://teztnets.xyz/hangzhounet-faucet) to generate a mnemonic and get some testnet ꜩ (tez).
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
    const {
      mnemonic: mnemonic0,
      email,
      password,
      activation_code: secret,
      network,
    } = req.body;
    const mnemonic = mnemonic0.join(' ');

    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    // call the importKey method
    undefined;
    throw new Error('Please complete the code');

    res.status(200).json(true);
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
    const {
      mnemonic: mnemonic0,
      email,
      password,
      activation_code: secret,
      network,
    } = req.body;
    const mnemonic = mnemonic0.join(' ');

    const url = getNodeUrl(network);
    const tezos = new TezosToolkit(url);

    await importKey(tezos, email, password, mnemonic, secret);

    res.status(200).json(true);
  }
//...
```

**What happened in the code above?**

- First, we create a new `TezosToolkit` instance.
- Next, we call the `importKey` method in order to activate the account.

---

# ✅ Make sure it works

Once the code in `pages/api/tezos/account.ts` is complete, copy & paste the faucet information into the textarea then click on **Create Account**.

---

# 🏁 Conclusion

Nice work! You now have a Tezos account on the testnet. In the next tutorial, we will query a Tezos node to determine the current balance of our account.
