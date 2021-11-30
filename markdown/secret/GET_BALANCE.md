Now that you have created an account on the **Secret** `supernova-2` network, and funded it using the faucet - We're going to check the balance of our account to make sure everything went alright.

{% hint style="info" %}
The native token on the **Secret Network** is **SCRT**
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/balance.ts`, implement the default function. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
  try {
    const url = getNodeUrl();
    const { address }= req.body
    const client = new CosmWasmClient(url)

    // Query the Account object
    const account = undefined;
    // Return the balance
    const balance = undefined;

    res.status(200).json(balance)
  }
```

**Need some help?** Check out these links 👇

- [**Query example**](https://github.com/enigmampc/SecretJS-Templates/blob/master/3_query_node/query.js)
- [**Check out the CosmWasmClient source to understand the `Account` interface**](https://github.com/enigmampc/SecretNetwork/blob/master/cosmwasm-js/packages/sdk/src/cosmwasmclient.ts)
- [**Also, look at `getAccount()` and what it returns**](https://github.com/enigmampc/SecretNetwork/blob/7adccb9a09579a564fc90173cc9509d88c46d114/cosmwasm-js/packages/sdk/src/cosmwasmclient.ts#L231)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

{% hint style="danger" %}
You could experience some issues with the availability of the network. [**Click here to check the current status of `supernova-2`**](https://secretnodes.com/secret/chains/supernova-2)
{% endhint %}

---

# 😅 Solution

```typescript
// solution
  try {
    const url = getNodeUrl();
    const { address }= req.body
    const client = new CosmWasmClient(url);

    const account = await client.getAccount(address);
    const balance = account?.balance[0].amount as string;

    res.status(200).json(balance)
  }
```

**What happened in the code above?**

- First, we return an instance of the `Account` class from the `getAccount()` method.
- Next, we check the balance by accessing the `amount` property of the `Account.balance[0]`. The array attached to `balance` here is because the TypeScript definitions specify a `balance` as being a `ReadOnlyArray<Coin>`. The zero-index refers to the SCRT Coin.
  - Take note of the use of the [optional chaining operator](https://www.codeisbae.com/typescript-optional-chaining-nullish-coalescing/): `?.` This effectively prevents passing an incorrect value back to the client-side, because if there is no balance property present the expression will not evaluate.

{% hint style="info" %}
If you want to see more info, why not inspect the `Account` Object directly in the terminal using `console.log(account)`?
{% endhint %}

{% hint style="tip" %}
The amount returned by is denominated in **μSCRT**, so to convert it to **SCRT** you'll need to divide it by 10\*\*6
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/secret/balance.ts` is complete, Next.js will rebuild the API route. Click on **Check Balance** and you should see the account balance displayed on the page.

---

# 🏁 Conclusion

1000 **SCRT** available, hmmm ... seems it's more than enough to do our first transfer. In the next step, we're going to buy an imaginary pizza which means making a transfer of tokens!
