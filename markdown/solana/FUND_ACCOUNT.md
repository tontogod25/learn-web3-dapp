With some protocols, different networks (testnet, mainnet, etc) have different token names. For example with Polkadot, the mainnet token is **DOT** and the testnet token is **WND**. In the Solana world, the token is always called **SOL**, no matter what network (or **cluster**) you are on. Don't get too excited: the tokens you get for free on the devnet cannot be used on Solana's mainnet. Nice try though 😉

---

# 🪂 Airdropping

To fund an account, we will do what is called an **airdrop** - some tokens will magically fall from the sky into our wallets! The cluster will provide us with some **SOL** so that we can test making transfers as well as view the transaction details on a block explorer.

{% hint style="info" %}
1 **SOL** is equal to 1,000,000,000 **lamports**. The name of **lamports** is in honour of Solana's biggest technical influence, [Leslie Lamport](https://en.wikipedia.org/wiki/Leslie_Lamport).
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/solana/fund.ts`, implement the `fund` function. Convert the text input to an address and use `requestAirdrop` to get 1 **SOL**. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
//..
  try {
    const {network, address} = req.body;
    const url = getNodeURL(network);
    const connection = new Connection(url, "confirmed");
    const publicKey = undefined;
    const hash = undefined;
    await undefined;
    res.status(200).json(hash);
  }
//..
```

**Need some help?** Check out these links 👇

- [Create a publicKey from a string](https://solana-labs.github.io/solana-web3.js/classes/PublicKey.html#constructor)
- [`requestAirdrop` documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#requestairdrop)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//..
  try {
    const {network, address} = req.body;
    const url = getNodeURL(network);
    const connection = new Connection(url, 'confirmed');
    const publicKey = new PublicKey(address);
    const hash = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(hash);
    res.status(200).json(hash);
  }
//..
```

**What happened in the code above?**

- We created a `PublicKey` from the string formatted address.
- We pass this to `requestAirdrop`, together with a constant which represents one `SOL`
- We can then verify than the transaction is confirmed by passing the transaction hash to the `confirmTransaction` method.
- Finally, we return the hash of the transaction to the client side in JSON format.

---

# ✅ Make sure it works

Once you have the code above saved:

- Copy and paste the generated address into the text input.
- Click on **Fund this Address**

Let the magic happen: You're now 1 SOL richer on devnet!

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-fund.gif)

---

# 🧐 Anatomy of an Explorer page

When viewing Transaction details on the Solana Explorer:

1. You can click on the Cluster name in the top right corner to choose which Solana Cluster to view.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-fund-account.png)

2. The Overview panel displays information such as the transaction signature, which block it was included in and what the fee amount for the transaction was.

3. The Account Input(s) panel displays the accounts involved in the transaction, including the change in their SOL balance and details like which account paid the transaction fee, and which was responsible for signing the transaction.

4. The Instruction(s) panel displays which Program instructions were used in the transaction. Most of the time this will be the Transfer instruction.

5. The Program Log contains logging output which pertains to the execution of the Program. Log output can be useful for developers to assist in debugging their programs.

More information about the terminology used on the Solana Explorer is available in the [terminology](https://docs.solana.com/terminology) section of the Solana docs.

---

# 🏁 Conclusion

Before we make our first transfer, let's check that that the account is actually funded by asking the cluster for our balance!
