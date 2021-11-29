In this tutorial, we will be creating a Polkadot account on the Westend testnet and funding it with **WND** tokens by connecting to a chatroom which hosts a _faucet_, a means for us to request free tokens.

There are currently a few different ways to create a new account on Polkadot or a testnet like Westend:

- **Programmatically** (with code) using the Polkadot API _(covered in this tutorial)_
- **Through a web browser** by using the [Polkadot Apps Wallet](https://polkadot.js.org/apps/#/accounts) (_in some kind of hurry for a hackathon?_)
- **Through a terminal** by using [SubKey](https://wiki.polkadot.network/docs/en/learn-account-generation#subkey) (_advanced, will not be covered in this tutorial_)

We will be creating an account programmatically using the API, however you might find it useful to explore the other options depending on your needs.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/polkadot/account.ts`, implement the function and try to create your first account on the polkadot network. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const keyring = new Keyring({ type: "sr25519" });

    // Create mnemonic string
    const mnemonic = undefined;

    const isValidMnemonic = mnemonicValidate(mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic')
    }

    // Add an account derived from the mnemonic
    const account = undefined;
    const address = undefined;
    const jsonWallet = undefined;
    res.status(200).json({
      address,
      mnemonic,
      jsonWallet,
    });
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
    const keyring = new Keyring({ type: "sr25519" });

    // Create mnemonic string
    const mnemonic = mnemonicGenerate();
    console.log(`Generated mnemonic: ${mnemonic}`);

    const isValidMnemonic = mnemonicValidate(mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic')
    }

    // Add an account derived from the mnemonic
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;
    const jsonWallet = JSON.stringify(keyring.toJson(account.address), null, 2)
    res.status(200).json({
      address,
      mnemonic,
      jsonWallet,
    });
  }
//...
```

**What happened in the code above?**

- First, we create a new `Keyring` instance of the `sr25519` type - This type parameter only applies to the default type of account created when no type is specified, it does not mean that the keyring can only store that type of account.
- Next, we generate a new BIP39 mnemonic using the `mnemonicGenerate` method.
- Next, we check if the mnemonic is valid using the `mnemonicValidate` method.
- Next we create our account from the mnemonic and add it to the keyring using the `addFromUri` method.
- Then, we return:
  - The address of our account.
  - The mnemonic, so we can restore our account later.
  - A JSON representation of our Wallet.
- Finally, we send this data back to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/polkadot/account.ts` is complete, Next.js will rebuild the API route. Now click on **Generate a Keypair** to make a Polkadot account. Remember to fund the the account by visiting the faucet and sending the message `!drip <your address>`.

---

# 🏁 Conclusion

Now that we have created a Polkadot account and funded it with **WND** testnet tokens, let’s move on to querying a Polkadot node to check the current balance of our account!
