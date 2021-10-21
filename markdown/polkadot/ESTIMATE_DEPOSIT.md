On Substrate blockchains, an account can stay active only if it maintains a minimal amount known as the **existential deposit**. If an account balance falls below this amount, then the system will erase the account and the remaining token dust will be lost.

In this tutorial, we'll learn how to query the system in order to retrieve the existential deposit.

---

# Challenge

{% hint style="tip" %}
In `pages/api/polkadot/deposit.ts`, implement the function and try to determine the existential deposit an account needs to have in order to remain active. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const deposit = undefined;
    res.status(200).json(deposit);
  }
//...
```

**Need some help?** Check out these links

- [**Polkadot.js documentation**](https://polkadot.js.org/docs/)
- [**Code examples**](https://polkadot.js.org/docs/api/examples/promise/)

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
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const deposit = api.consts.balances.existentialDeposit.toNumber();
    res.status(200).json(deposit);
  }
//...
```

**What happened in the code above?**

- First, we need to instantiate our connection to the Polkadot API.
- Next, we call `existentialDeposit` of the `const.balances` module, converting the property to a number with `toNumber`.
- Finally, we send the `deposit` amount back to the client-side as JSON.

---

# Make sure it works

Once the code is complete and the file has been saved, Next.js will rebuild the API route. Click the button to display the existential deposit amount.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polkadot/polkadot-deposit.gif)

---

# Conclusion

Now that we've learned about fees, balances and the existential deposit on Polkadot - we can move on to making a token transfer! In the next tutorial, we will learn how to send tokens to other accounts. Ready? Let's go!
