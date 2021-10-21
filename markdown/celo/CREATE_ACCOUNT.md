Please make sure that you have completed the previous step, Connecting to Celo.

It’s time to create your first Celo account on the **Alfajores** testnet. Without it, you won’t be able to fully take advantage of Celo's features.

---

# Challenge

{% hint style="tip" %}
In `pages/api/celo/account.ts`, implement the function to first create a **mnemonic**, then produce an **address** from the **public key** belonging to the **mnemonic**. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
try {
    const url = getSafeUrl();
    const kit = newKit(url);
    const account = undefined;
    const address = undefined;
    const secret = undefined;

    res.status(200).json({
        address,
        secret
    })
}
//...
```

**Need some help?**

- [**Account documentation**](https://web3js.readthedocs.io/en/v1.4.0/web3-eth-accounts.html)

{% hint style="info" %}
You can [**join us on Discord**](https://discord.gg/fszyM7K), if you have questions or want help completing the tutorial.
{% endhint %}

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# Solution

```typescript
// solution
//...
try {
    const url = getSafeUrl();
    const kit = newKit(url);
    const account = kit.web3.eth.accounts.create();
    const address = account.address;
    const secret = account.privateKey;

    res.status(200).json({
        address,
        secret
    })
}
//...
```

**What happened in the code above?**

- First, we create a new `kit` instance.
- Next, using `web3.eth` we can access a proxy of the [**web3.js - Ethereum Javascript API**](https://web3js.readthedocs.io/en/v3.0.0-rc.5/)
- Next, calling `create` from the `account` module, we can create a new account.
- Finally to access:
  - The address, using the `address` property.
  - The private key, using the `privateKey` property.

{% hint style="tip" %}
Do not forget to fund the newly created wallet using the [Celo developer faucet](https://celo.org/developers/faucet) in order to activate it!
{% endhint %}

---

# Make sure it works

Once the code is complete and the file is saved, Next.js will rebuild the API route. Now click on **Generate a Keypair** and you should see:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/celo/celo-account.gif)

---

# Conclusion

Now that we have a Celo account created and funded with testnet tokens, let’s move on to querying a Celo node to get the current balance of our account!
