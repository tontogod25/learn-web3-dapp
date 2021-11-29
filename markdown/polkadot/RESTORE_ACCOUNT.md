In this tutorial, we'll learn how to restore a wallet from a mnemonic and how to derive the address and the private key when the wallet has been restored.

Ready? Let's go!

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/polkadot/restore.ts`, implement the function and try to restore your account using your mnemonic. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const { mnemonic } = req.body;
    const keyring = undefined;
    const account = undefined;
    const address = undefined;
    res.status(200).json(address);
  }
//...
```

**Need some help?** Check out these links 👇

- [**Keyring Basics**](https://polkadot.js.org/docs/keyring/start/basics)
- [**Using address or publicKey**](https://polkadot.js.org/docs/keyring/start/sign-verify#verify-using-address-or-publickey)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const { mnemonic } = req.body;
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;
    res.status(200).json(address);
  }
//...
```

**What happened in the code above?**

- First, we create a new `Keyring` instance of the `sr25519` type.
- Then we can use the `addFromUri` method to add the supplied mnemonic to the keyring - this is the account.
- We can now access the public address via the `address` property of the `account`.
- Finally, we send the address of the account back to the client-side as JSON.

---

# ✅ Make sure it works

When the code in `pages/api/polkadot/restore.ts` is complete, click on **Restore Account** to restore your Polkadot address from the mnemonic.

---

# 🏁 Conclusion

The ability to restore an account without requiring a third party is a great feature of **Polkadot**. Now, we're ready to go further and prepare our first transaction. In the next tutorial, we're going to learn how to estimate the fees required to submit a simple transfer.
