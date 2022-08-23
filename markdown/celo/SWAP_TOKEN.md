It’s time to submit another transaction. In this challenge, we will connect to a Celo node and we will swap 1 **cUSD** stable token against the expected amount of **CELO** token. As you remember from a previous tutorial, we funded our account on the `Alfajores` testnet with 5 **CELO** and 10 **cUSD**. Now let’s try to swap 1 **cUSD** token to **CELO**.
Celo has a number of core smart contracts that are deployed to the network. In this challenge, we'll use the StableToken and Exchange contract wrappers, which have all the expected functions enabling us to swap tokens.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/celo/swap.ts`, implement the **swap** function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
// Get contract wrappers
// - StableTokenWrapper
// - ExchangeWrapper
const stableToken = undefined;
const exchange = undefined;

// Approve a user to transfer StableToken on behalf of another user.
const approveTx = undefined;

// Exchange cUSD for CELO
const goldAmount = undefined;
const sellTx = undefined;
//...
```

**Need some help?** Check out these links 👇

- [**We can access the cUSD contract with kit.contracts.getStableToken()**](https://docs.celo.org/developer-guide/contractkit/contracts-wrappers-registry#interacting-with-celo-and-cusd)
- [**Code example**](https://docs.celo.org/developer-guide/contractkit/usage#buying-all-the-celo-i-can-with-the-cusd-in-my-account)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// Get contract wrappers
// - StableTokenWrapper
// - ExchangeWrapper
const stableToken = await kit.contracts.getStableToken();
const exchange = await kit.contracts.getExchange();

await stableToken
  .approve(exchange.address, OneCUSD)
  .send({from: address, feeCurrency: stableToken.address})
  .then((receipt) => receipt.waitReceipt());
// Exchange cUSD for CELO
const goldAmount = await exchange.quoteStableSell(OneCUSD);
const sellReceipt = await exchange
  .sellStable(OneCUSD, goldAmount)
  .send({from: address, feeCurrency: stableToken.address});
await sellReceipt.waitReceipt();
const hash = await sellReceipt.getHash();
//...
```

**What happened in the code above?**

- First, we store into the `stableToken` variable the `StableTokenWrapper` contract interface by calling `getStableToken`.
- Next, we store into the `exchange` variable the `ExchangeWrapper` contract interface by calling `getExchange`.
- Next, we approve the transfer of **cUSD** from our address using the `approve` method of `stableToken` from our `StableTokenWrapper` contract interface.
- Next, we return the calculated the amount of **CELO** token to exchange from the amount of **cUSD** expected to be exchanged as `goldAmount`.
- Finally, we can sell the amount of stable token, in this example 1 **cUSD** against **CELO** token.
- We can get a receipt with the convenient `waitReceipt` method on the transaction. Note that because both of these functions return a Promise, `sellReceipt` will not return before `sellTx` as long as they are both prefaced with `await`. Asynchronous code is awesome!

---

# ✅ Make sure it works

Once the in `pages/api/celo/swap.ts` is complete, click on **Swap 1 cUSD**. When the transaction is complete, you will see how many CELO you got for swapping the stabletoken.

{% hint style="info" %}
Fun fact, if you take the inverse of the returned value you'll find the price quotation displayed on [Coinmarketcap](https://coinmarketcap.com/currencies/celo/)
{% endhint %}

---

# Conclusion

We now know how to query the Celo network and how to submit transactions. So far, we've only used core Celo smart contracts. Now it’s time to learn how to deploy our own smart contract and interact with it!
