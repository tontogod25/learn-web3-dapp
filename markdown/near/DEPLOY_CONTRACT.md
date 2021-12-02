We won't go through the process of reviewing the smart contract code base, compiling it or testing it. We will focus instead on how one can deploy a smart contract using the `near-js-api`. To do this, we're going to use a pre-compiled smart contract, you can find it under `./contract/near/out/main.wasm`.

Our contract will be pretty basic. It stores a string on the blockchain and implements two functions:

- The `get_greeting` function, which takes an **accountId** and returns the string stored for a specific account.
- The `set_greeting` function, which takes an **accountId** and stores the string for a specific account.

{% hint style="working" %}
If you want to learn more about NEAR smart contracts, you can follow the tutorial [here](https://learn.figment.io/tutorials/write-and-deploy-a-smart-contract-on-near)
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/near/deploy.ts`, implement the default function. Deploy your first smart contract on the **NEAR** testnet. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
  try {
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);

    // Again you will need to set your keystore
    config.keyStore?.undefined;

    const near = await connect(config);
    const account = await near.account(accountId);

    // Time to deploy the Smart Contract
    const response = undefined;
    return res.status(200).json(response.transaction.hash)
  }
//...
```

**Need some help?** Check out this link 👇

- [Learn more about `deployContract`](https://near.github.io/near-api-js/classes/account.account-1.html#deploycontract)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
  try {
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);
    config.keyStore?.setKey("testnet", accountId, keypair);
    const near = await connect(config);
    const account = await near.account(accountId);
    const response = await account.deployContract(fs.readFileSync(WASM_PATH));
    return res.status(200).json(response.transaction.hash);
  }
//...
```

**What happened in the code above?**

- First, we need to _rehydrate_ our `KeyPair` using our secret.
- Next, we're calling the `deployContract` method with the `WASM_PATH` pointing to the location of the compiled smart contract. In this example we are using the JavaScript `fs` core module and the `[readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)` method, which is responsible for converting the file into a Buffer so it can be sent to NEAR in the correct format.
- Finally, we can send the transaction hash back to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/near/deploy.ts` is complete, click on **Deploy Contract** to send the compiled smart contract to NEAR.

---

# 🏁 Conclusion

Now that we have deployed a smart contract, let's interact with it. In the following tutorials, we will look at how to use both view and change functions.
