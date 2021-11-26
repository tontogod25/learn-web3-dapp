Last but certainly not least, we'll need to modify the data stored into **greeter**. Doing so will change the state of the blockchain, so we'll have to create a transaction. In the challenge below, we're going to show you how to achieve this.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/solana/setter.ts`, complete the `setter` function. First you'll have to create an instruction, then you'll have to send and confirm a transaction to store the data from. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
// this your turn to figure out
// how to create this instruction
const instruction = new TransactionInstruction(undefined);

// this your turn to figure out
// how to create this transaction
const hash = await sendAndConfirmTransaction(undefined);

res.status(200).json(undefined);
//...
```

**Need some help?** Here are a few hints

- [Read about TransactionInstruction](https://solana-labs.github.io/solana-web3.js/classes/TransactionInstruction.html)
- [Read about sendAndConfirmTransaction](https://solana-labs.github.io/solana-web3.js/modules.html#sendAndConfirmTransaction)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
const instruction = new TransactionInstruction({
  keys: [{pubkey: greeterPublicKey, isSigner: false, isWritable: true}],
  programId: programKey,
  data: Buffer.alloc(0), // All instructions are hellos
});

const hash = await sendAndConfirmTransaction(
  connection,
  new Transaction().add(instruction),
  [payerKeypair],
);

res.status(200).json(hash);
//...
```

**What happened in the code above?**

- First, we create a `new` instance of the `TransactionInstruction` class:
  - With the greeter's public key, setting the **isWritable** flag to `true`
  - With the `programId` or address of the program we want to call: `programKey`.
  - With the data we want to pass to the call. In this case, there is only one kind of instruction we can send and `Buffer.alloc(0)` is like referring to the zero-index of an array. If there were multiple instructions, we would alter this value.
- Then we send and await the transaction confirmation. `[payerKeypair]` is the account created during second tutorial, "Create an account".

---

# ✅ Make sure it works

Once the code in `pages/api/solana/setter.ts` is complete, click on **Send Greeting** to perform the transaction and increment the stored number of greetings by 1.

---

# 🏁 Conclusion

From connecting to a cluster to deploying and interacting with programs, you've covered all the basics of using Solana! Proceed to the final step for a quick recap and some links to additional learning resources.
