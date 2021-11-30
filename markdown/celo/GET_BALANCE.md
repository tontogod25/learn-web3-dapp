Now that we have our account created, wouldn’t it be nice to keep track of our cUSD and CELO balances? In this step, we will examine how we can do just that!

{% hint style="info" %}
The Celo blockchain has three native assets, **CELO** (CELO), the **Celo Dollar** (cUSD) and the **Celo Euro** (cEUR). These assets implement the `ERC20` token standard from Ethereum. The CELO asset is managed by the CELO smart contract and Celo Dollar or Celo Euro are managed by the cUSD or cEUR contracts.
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/celo/balance.ts`, implement the **balance** function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    const goldtoken = undefined;
    const celoBalance = undefined;

    const stabletokenUSD = undefined;
    const cUSDBalance = undefined;

    const stabletokenEUR = undefined;
    const cEURBalance = undefined;

    res.status(200).json({
      attoCELO: celoBalance.toString(),
      attoUSD: cUSDBalance.toString(),
      attoEUR: cEURBalance.toString(),
    });
  }
//...
```

**Need some help?** Check out these links 👇

- [**We can access the CELO contract via the SDK with kit.contracts.getGoldToken()**](https://docs.celo.org/developer-guide/contractkit/contracts-wrappers-registry#interacting-with-celo-and-cusd)
- [**We can access the cUSD contract with kit.contracts.getStableToken()**](https://docs.celo.org/developer-guide/contractkit/contracts-wrappers-registry#interacting-with-celo-and-cusd)
- [**Reading from Alfajores**](https://docs.celo.org/developer-guide/start/hellocelo#reading-alfajores)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {address, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    const goldtoken = await kit.contracts.getGoldToken();
    const celoBalance = await goldtoken.balanceOf(address);

    const stabletokenUSD = await kit.contracts.getStableToken("cUSD");
    const cUSDBalance = await stabletokenUSD.balanceOf(address);

    const stabletokenEUR = await kit.contracts.getStableToken("cEUR");
    const cEURBalance = await stabletokenEUR.balanceOf(address);
    
    res.status(200).json({
      attoCELO: celoBalance.toString(),
      attoUSD: cUSDBalance.toString(),
      attoEUR: cEURBalance.toString(),
    })
  }
//...
```

**What happened in the code above?**

- First, we create a new `kit` instance.
- Next, we call the `getGoldToken` method of the `contracts` module to access CELO contract, then providing the input address to the `balanceOf` method, returning the balance of **CELO** token.
- Next, we call the `getStableToken` method of the `contracts` module to access the cUSD and cEUR contracts, then provide the input address to the `balanceOf` method, returning the balance of **cUSD** and **cEUR** tokens.

{% hint style="tip" %}
The amount returned by these calls is denominated in **aCELO** and **acUSD**, which stands for "attoCELO" and "attocUSD" - representing [eighteen decimal places](https://en.wikipedia.org/wiki/Atto-). So to convert it to **CELO** and **cUSD** you'll need to divide it by 10\*\*18 💪
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/celo/balance.ts` is complete, Next.js will rebuild the API route. Click on **Check Balance** and you should see the balances displayed on the page.

---

# 🏁 Conclusion

Querying the balance information is fun, but being able to submit transactions and change the state of a blockchain is even better! In the next step, we will dive deeper and submit our first transactions on Celo.
