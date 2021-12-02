After the creation of your account on the **NEAR** testnet, the **NEAR Helper** provides an automatic **airdrop** of 200 **NEAR** tokens. In this tutorial, we're going to check the balance of our account to make sure everything went alright.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/near/balance.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
  try {
      const config = configFromNetwork(network);
      const client = await connect(config);
      const account = undefined;
      const balance = undefined;
      console.log(balance)
      return res.status(200).json(balance.available)
  }
```

**Need some help?** Check out these links 👇

- [Basic `NEAR` economics](https://docs.near.org/docs/concepts/gas)
- [The `Account` class](https://near.github.io/near-api-js/classes/account.account-1.html)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
  try {
      const config = configFromNetwork(network);
      const client = await connect(config);
      const account = await client.account(accountId);
      const balance = await account.getAccountBalance();
      return res.status(200).json(balance.available)
  }
```

**What happened in the code above?**

- First, we create an `account` object, representing our account. Pass the `accountId` as the only argument.
- Next, we call the `getAccountBalance` method, which returns the calculated account balance. The `AccountBalance` type has four properties; `total`, `stateStaked`, `staked` and `available`. A calculated balance might contain some staked NEAR tokens, but right now we haven't got anything staked so don't worry about this.

{% hint style="tip" %}
The amount returned by `getAccountBalance` is denominated in **yoctoNEAR**, so to convert it to **NEAR** you'll need to divide it by 10\*\*24
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/near/balance.ts` is complete, Next.js will rebuild the API route. Click on **Check Balance** and you should see the balance displayed on the page.

---

# 🏁 Conclusion

200 **NEAR** available, hmmm ... More than enough to do our first transfer. In the next tutorial, we're going to buy an imaginary pizza with our testnet NEAR! Transferring tokens is generally done as an exchange for goods or services.
