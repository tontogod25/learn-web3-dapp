Our contract is on-chain, and we're going to learn how to modify the message stored in the state of the contract.

{% hint style="working" %}
If you want to learn more about NEAR smart contracts, you can follow the tutorial [here](https://learn.figment.io/tutorials/write-and-deploy-a-smart-contract-on-near)
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/near/setter.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
  try {
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);
    config.keyStore?.setKey('testnet', accountId, keypair);

    const near = await connect(config);
    const account = await near.account(accountId);
    // Look at functionCall and pass the expected args
    // ... fill here
    return res.status(200).json(response.transaction.hash);
  }
//...
```

**Need some help?** Check out this link 👇

- [Learn about `functionCall`](https://near.github.io/near-api-js/classes/account.account-1.html#functioncall)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
  try {
    const config = configFromNetwork(network);
    const keypair = KeyPair.fromString(secret);
    config.keyStore?.setKey('testnet', accountId, keypair);

    const near = await connect(config);
    const account = await near.account(accountId);

    const optionsCall = {
        contractId: accountId,
        methodName: 'set_greeting',
        args: { message: newMessage }
    }
    const response = await account.functionCall(optionsCall);

    return res.status(200).json(response.transaction.hash)
  }
//...
```

**What happened in the code above?**

- We're calling the `functionCall` method of our account, passing to it:
  - The `contractId` which is the same as our account name. This is because the contract has been deployed to our account.
  - The name of the method we want to call, `set_greeting`
  - The name of the argument expected by `get_greeting`, which is `message`.

---

# ✅ Make sure it works

Once the code in `pages/api/near/setter.ts` is complete, enter a value into the textinput then click the **Set greeting** button to send the new value to the smart contract.

---

# 🏁 Conclusion

Congratulations! You have successfully created, deployed, and interacted with a smart contract on the NEAR Testnet.
