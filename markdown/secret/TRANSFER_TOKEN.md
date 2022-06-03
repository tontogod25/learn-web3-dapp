Of course, everyone likes to eat pizza, but among all available pizzas you prefer the pizza you've made for yourself. So to simplify the transfer process we're going to make a transfer _from_ our own account _to_ our own account again.

To do so, you'll need to make an encrypted transaction - in the **Secret** world everything is done with privacy in mind! Let's take a look at how to do this.

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/secret/chains/pulsar-2)
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/transfer.ts`, implement the default function. There is a lot to fill here, so be careful!
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//..
// 0. A very specific Secret feature (this allows us to make the transaction encrypted)
const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

// 1. The fees you'll need to pay to complete the transaction
const fees = {
  send: {
    amount: [{amount: '80000', denom: 'uscrt'}],
    gas: '80000',
  },
};

// 2. Initialize a secure Secret client
const client = new SigningCosmWasmClient(undefined);

// 3. Send tokens
const memo = 'sendTokens example'; // Optional memo to identify the transaction
const sent = await client.sendTokens(undefined);

// 4. Query the tx result
const query = {id: sent.transactionHash};
const transaction = await client.searchTx(query);
//..
```

**Need some help?** Check out these links 👇

- [**Transaction example**](https://github.com/enigmampc/SecretJS-Templates/blob/master/4_transactions/send.js)
- [**Documentation of `secrectjs`**](https://github.com/enigmampc/SecretNetwork/tree/master/cosmwasm-js/packages/sdk)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// 2. Initialize a secure Secret client
const client = new SigningCosmWasmClient(
  url,
  address,
  (signBytes) => signingPen.sign(signBytes),
  txEncryptionSeed,
  fees,
);

// 3. Send tokens
const memo = 'sendTokens example'; // optional memo
const sent = await client.sendTokens(
  address,
  [
    {
      amount: txAmount,
      denom: 'uscrt',
    },
  ],
  memo,
);
//..
```

**What happened in the code above?**

- First, we create a secure connection using `SigningCosmWasmClient`, passing:
  - The `url` of the network.
  - The `address` of our wallet.
  - A closure capturing our `signingPen`, to sign the transaction.
  - A randomized seed, for privacy - this was generated above by `EnigmaUtils.GenerateNewSeed()`
  - Some fees to reward the validator which will process our transaction.
- Next, we send the specified amount of token using `sendTokens`, passing:
  - The recipient `address`.
  - The amount, and `denom` (denomination) of the token - in this case `uscrt`. Note that the format here is an object inside of an array: `[{}]`. This is because the `fees` amount is using the TypeScript definition for the `Coin` interface, which is a `ReadOnlyArray<Coin>` containing both the `denom` and `amount`.
  - An optional `memo` to identify the transaction.

---

# ✅ Make sure it works

Once the code in `pages/api/secret/transfer.ts` is complete, fill in the amount of **SCRT** you want to send to your favorite pizza maker (and as you realize, it was yourself), then click on **Submit Transfer** to send the transaction.

---

# 🏁 Conclusion

Now that we have funded our account and made a transfer, let's move on to deploying some code (known as a "smart contract") to the **Secret** blockchain! Ready to take the plunge? Let's go!
