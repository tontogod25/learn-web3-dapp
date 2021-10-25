In this tutorial, we will learn how to query an account balance on Polkadot. Account balances are important to keep track of so that users know if they can afford to send a transaction, or to afford what is called the **existential deposit**, which will be explained in the next tutorial.

---

# Challenge

{% hint style="tip" %}
In `pages/api/polkadot/balance.ts`, implement the function and try to query the balance of your account. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const { address } = req.body;
    const url = getSafeUrl();
    provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const { data: balance } = undefined;
    const amount = undefined;
    await provider.disconnect();
    res.status(200).json(amount);
  }
//...
```

**Need some help?** Check out these links

- [**Basic queries**](https://polkadot.js.org/docs/api/start/api.query#basic-queries)

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
    const { address } = req.body;
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const { data: balance } = await api.query.system.account(address);
    const amount = balance.free.toNumber();
    res.status(200).json(amount);
  }
//...
```

**What happened in the code above?**

- First, we need instantiate our connection to the Polkadot API.
- Next, we destructure the data returned by the `query.system.account` method as `balance`.
- Then we can access the available balance of our account via the `free` property, converting it into a number with `toNumber`.
- Finally, we send the `amount` back to the client-side as JSON.

---

# Make sure it works

Once the code is complete and the file is saved, Next.js will rebuild the API route. Click on **Check Balance** and you should see the balance displayed on the page:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polkadot/polkadot-balance.gif)

---

# Conclusion

Querying the balance information is fun, but being able to submit transactions and change the state of a blockchain is even better! Soon, we will dive deeper and submit our first transactions on Polkadot. But first, we need to understand the **existential deposit** feature of Polkadot accounts.
