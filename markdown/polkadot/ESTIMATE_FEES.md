In this tutorial, we will learn how to make a transfer of tokens on Polkadot. Transferring is a basic and fundamental feature of the Polkadot network. Transfers are not free, as they modify the state of the blockchain. How can we estimate the fees associated with a simple transfer?

We'll explore how to estimate fees in this challenge.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/polkadot/estimate.ts`, implement the function and try to estimate the fees required for a simple transfer. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {address, network} = req.body;
    const url = getNodeUrl(network);
    provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });

    // A generic address for recipient (//Alice) and an amount to send
    const recipient = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
    const transferAmount = '1000000000';

    // Transfer tokens
    const transfer =  undefined;
    const info = undefined;
    const fees = undefined;

    await provider.disconnect();
    res.status(200).json(fees);
  }
//...
```

**Need some help?** Check out this link 👇

- [**How do I estimate the transaction fees?**](https://polkadot.js.org/docs/api/cookbook/tx#how-do-i-estimate-the-transaction-fees)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {address, network} = req.body;
    const url = getNodeUrl(network);
    provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });

    // A generic address for recipient (//Alice) and an amount to send
    const recipient = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
    const transferAmount = '1000000000'; // 1 milli WND

    // Transfer tokens
    const transfer =  api.tx.balances.transfer(recipient, transferAmount);
    const info = await transfer.paymentInfo(address);
    const fees = info.partialFee.toNumber();

    res.status(200).json(fees)
  }
//...
```

**What happened in the code above?**

- First, we create a new transaction for a transfer using the `tx.balances.transfer` method, passing the `recipient` and `transferAmount`.
- Next, we call the `paymentInfo` method on the transaction object.
- Then we convert the `partialFee` property to a number with `toNumber`.
- Finally, we send the information back to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/polkadot/estimate.ts` is complete, click on **Estimate Fees** to get the estimated fees to perform a token transfer.

---

# 🏁 Conclusion

Now that we understand how to estimate the fees required to pay for a transaction on Polkadot, let’s move on to querying a Polkadot node to get the current balance of our account!
