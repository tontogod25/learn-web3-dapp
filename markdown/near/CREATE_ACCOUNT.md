Unlike many other Web 3 protocols, NEAR uses a human readable account ID instead of a public key hash. You can link as many `keypairs` to a NEAR account as you want. Here, we're going to Learn how to check the availability and to create a NEAR account name. As you might expect, **figment.testnet** is already taken.

---

# 🏋️ Challenge 1 of 2

{% hint style="tip" %}
In `pages/api/near/check-account.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
  try {
    const config = configFromNetwork(network);
    const near = await connect(config);
    // Query the account info of freeAccountId
    const accountInfo = undefined
    try {
        undefined;
        return res.status(200).json(false)
    } catch (error) {
        return res.status(200).json(true)
    }
  }
```

**Need some help?** Check out these links

- [The `Account` class](https://near.github.io/near-api-js/classes/account.account-1.html)
- [An explanation of `NEAR Accounts`](https://docs.near.org/docs/concepts/account)
- [RPC `view_account`](https://docs.near.org/docs/develop/front-end/rpc#view-account)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
  try {
    const config = configFromNetwork(network);
    const near = await connect(config);
    const accountInfo = await near.account(freeAccountId);
    try {
        await accountInfo.state();
        return res.status(200).json(false)
    } catch (error) {
        return res.status(200).json(true)
    }
  }
```

**What happened in the code above?**

- First, we create an `Account` object from the `freeAccountId` being passed in the request body.
- Next, we query the state of this object with the `state` method:
  - If it returns `true`, the account exists and we will return a `false` value to the client-side - indicating that the name is unavailable.
  - If `state` returns `false`, the account doesn't exist - so we pass a `true` value back to the client-side, indicating that the name is available. Phew! Little bit of programming logic there.

---

# 🏋️ Challenge 2 of 2

{% hint style="tip" %}
In `pages/api/near/create-account.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
try {
    const config = configFromNetwork(network);
    const near = await connect(config);
    undefined;
    return res.status(200).json(freeAccountId);
}
```

**Need some help?** Check out this link 👇

- [`createAccount` method](https://near.github.io/near-api-js/classes/near.near-1.html#createaccount)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
try {
    const config = configFromNetwork(network);
    const near = await connect(config);
    await near.createAccount(freeAccountId, publicKey);
    return res.status(200).json(freeAccountId);
}
```

**What happened in the code above?**

- First, we need to [destructure](https://dmitripavlutin.com/javascript-object-destructuring/) the values from the request body so that we can use them in our code. We are also specifying a TypeScript type of `AccountReq` here.
- Then we use `configFromNetwork`, passing the `network` from the request body - now we can create a connection, `near`.
- Next, we call the `createAccount` method passing the `freeAccountId` and the `publicKey` from the request body.
- Finally, we can return the name of the account to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/near/check-account.ts` is complete, Next.js will rebuild the API route. Choose an account ID and enter it into the textinput, then click on **Check it!** to see if it is available.

---

# 🏁 Conclusion

Every new account created on the testnet is given a free **airdrop** of 200 NEAR tokens. So cool!
Ready to move on? Let's check the account balance in the next step.
