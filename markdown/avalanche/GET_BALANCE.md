Now that you have created an account on the Avalanche **Fuji** testnet and funded it using the faucet - We're going to check the balance of the account to make sure everything went alright. The native token of the **Avalanche** blockchain is **AVAX**, so we will want to start on the X-Chain.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/avalanche/balance.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

```typescript
//...
  try {
    const {network, address} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const balance = undefined;
    res.status(200).json(balance.balance);
  }
//...
```

**Need some help?** Check out these tips

- The `getBalance` method of the `AVMAPI` module looks like a good candidate!
- [**Code examples**](https://github.com/ava-labs/avalanchejs/tree/master/examples/avm)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {network, address} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const balance = await chain.getBalance(address, "AVAX") as BalanceT;
    res.status(200).json(balance.balance);
  }
//...
```

**What happened in the code above?**

- The `getBalance` method will return the current balance of the specified asset (like AVAX) for the specified address.

{% hint style="tip" %}
The amount returned by is denominated in **nAVAX**, so to convert it to **AVAX** you'll need to divide it by 10\*\*9
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/avalanche/balance.ts` is complete, Next.js will rebuild the API route. Click on **Check Balance**, then you should see the balance displayed on the page.

---

# 🏁 Conclusion

Querying the balance information is fun, but being able to submit transactions and change the state of a blockchain is even better! In the next step, we will dive deeper and submit our first transactions on Avalanche.
