In order to transfer some value to another account, we need to create and send a signed transaction to the **cluster**. Once you understand how to do this, you will have a solid foundation on which to interact with other portions of the Solana API.

When a transaction is submitted to the **cluster**, the Solana runtime will execute a program to process each of the instructions contained in the transaction, in order, and atomically. This means that if any of the instructions fail for any reason, the entire transaction will revert.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/solana/transfer.ts` finish implementing the `transfer()` function.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
//..
//... let's snip the beginning as it should be familiar for you by now!
// Find the parameter to pass
const instructions = SystemProgram.transfer;

// How could you construct a signer array's
const signers = undefined;

// Maybe adding someting to a Transaction could be interesting ?
const transaction = new Transaction();

// We can send and confirm a transaction in one row.
const hash = undefined;
//..
```

**Need some help?** Here are a few hints

- [Read about `sendAndConfirmTransaction`](https://solana-labs.github.io/solana-web3.js/modules.html#sendAndConfirmTransaction)
- [Read about adding instructions to `Transaction`](https://solana-labs.github.io/solana-web3.js/classes/Transaction.html#add)
- [Anatomy of a `Transaction`](https://docs.solana.com/developing/programming-model/transactions)

{% hint style="info" %}
You can [**join us on Discord**](https://discord.gg/fszyM7K), if you have questions or want help completing the tutorial.
{% endhint %}

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//..
//... let's snip the beginning as it should be familiar for you by now!
const instructions = SystemProgram.transfer({
  fromPubkey,
  toPubkey,
  lamports,
});

const signers = [
  {
    publicKey: fromPubkey,
    secretKey,
  },
];

const transaction = new Transaction().add(instructions);

const hash = await sendAndConfirmTransaction(connection, transaction, signers);

res.status(200).json(hash);
//..
```

**What happened in the code above:**

- We create `instructions` for the transaction: From who, to who and what amount.
- We also need a `signers` array with only one signer: the account sending the transaction. It contains both the signers `publicKey` & `secretKey`.
  - The `secretKey` is used to sign the transaction.
- Create a `Transaction` object and `add()` the instructions to it.
- Send and await the confirmation of the signed transaction using `sendAndConfirmTransaction`.
- Finally, we return the transaction hash to the client-side as JSON.

---

# ✅ Make sure it works

Once you've filled in the form with a value, click **Submit Transfer**:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-transfer.gif)

**About the explorer**, it's very good practice to look over all the fields one by one to familiarize yourself with the structure of a transaction. This page features the transaction result (`SUCCESS`), status (`FINALIZED`), the amount sent, the `from` and `to` addresses, the block that included this transaction, the fee that was paid, etc.

---

# 🧐 Anatomy of an Explorer page

When viewing Account details on the Solana Explorer:

1. The Account Overview panel displays information about the account including its address, balance, and information about whether or not there is a Program deployed at that address.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-transfer.png)

2. The History tab displays the Transaction history for the selected account, which is a list of previous transactions that account has been involved in.

3. The Tokens tab displays information regarding any tokens held by the account.

---

# 🏁 Conclusion

Now that you are comfortable with accounts and tokens, we will look at how to deploy a program written in the Rust language to the Solana cluster. Don't worry, this process is not as scary as it sounds 😇
