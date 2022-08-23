It’s time to submit your first transactions. In this challenge, we will connect to a Celo node and we will transfer our testnet token. As you remember from previous step, we funded our account on the `Alfajores` testnet with 5 **CELO** and 10 **cUSD**. Now let’s try to transfer some **CELO** tokens to another testnet account.
Celo has a number of core smart contracts that are deployed to the network. In this challenge, we'll use the GoldToken contract wrappers, which have a `transfer` and a `send` function allowing us to build a transfer transaction.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/celo/transfer.ts`, implement the **transfer** function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//..
  try {
    const {secret, amount, recipient, address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    // Restore account using your secret
    undefined
    // Access CELO contract wrapper
    const celoToken = undefined;
    // Build the transaction and send
    const celotx = undefined;
    // Wait for confirmation of the transaction
    const celoReceipt = await celotx.waitReceipt();

    res.status(200).json(celoReceipt.transactionHash);
  }
//..
```

**Need some help?** Check out these links 👇

- [**We can access the CELO contract via the SDK with kit.contracts.getGoldToken()**](https://docs.celo.org/developer-guide/contractkit/contracts-wrappers-registry#interacting-with-celo-and-cusd)
- [**Restore an account from private key with `addAccount`**](https://docs.celo.org/developer-guide/sdk-code-reference/summary-17/modules/_rpc_wallet_.rpcwallet#methods)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
  try {
    const {secret, amount, recipient, address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    kit.addAccount(secret);
    const celoToken = await kit.contracts.getGoldToken();
    const celotx = await celoToken
      .transfer(recipient, amount)
      .send({from: address});

    const celoReceipt = await celotx.waitReceipt();

    res.status(200).json(celoReceipt.transactionHash);
  }
//..
```

**What happened in the code above?**

- First, we initialize the account using `addAccount` with our private key.
- Next, we store into the `celoToken` variable the `GoldTokenWrapper` contract interface by calling `getGoldToken`.
- Finally, we can interact with the **CELO** token using this interface, chaining the `transfer` and `send` methods with the expected parameters:
  - `recipient` and `amount` for the `transfer`
  - An object containing the key `from` with a value of `address` for the `send`.
- Finally, we will wait for confirmation of the transaction on the blockchain, which is neatly packaged into `waitReceipt`: The resulting `transactionHash` is what we will return to the client side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/celo/transfer.ts` is complete, Next.js will rebuild the API route. Fill in the amount of **CELO** you want to send, then click on **Submit Transfer**.

---

# 🏁 Conclusion

Now that we have funded our account and made a transfer, let's move on to perform a more advanced kind of transfer: a **Swap**.
With ContractKit, you can always exchange your **cUSD** or **cEUR** to **CELO** and the other way around. Let’s learn how we can do that in the next tutorial!
