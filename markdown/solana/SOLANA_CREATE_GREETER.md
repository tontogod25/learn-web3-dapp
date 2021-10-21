In Solana's world, programs are stateless, which means they don't store the value they act on. Then how can our program keep count of the number of times it has been greeted ?

We have to rely on another account to store the data - Which is why we're going to create a new account, the **greeter account** (owned by our program) in order to store the `count` info.

{% hint style="info" %}
Solana programs are stateless. To store values we must use a separate account.
{% endhint %}

---

# 👨‍💻 Challenge

{% hint style="tip" %}
In `pages/api/solana/greeter.ts`, implement `greeter`. First, derive the **greeter** address from some values. Then create a transaction which instructs the blockchain to create the **greeter** account. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
// Are there any methods from PublicKey to derive a public key from a seed?
const greetedPubkey = await PublicKey.undefined;

// This function calculates the fees we have to pay to keep the newly
// created account alive on the blockchain. We're naming it lamports because
// that is the denomination of the amount being returned by the function.
const lamports = await connection.getMinimumBalanceForRentExemption(
  GREETING_SIZE,
);

// Find which instructions are expected and complete SystemProgram with
// the required arguments.
const transaction = new Transaction().add(SystemProgram.undefined);

// Complete this function call with the expected arguments.
const hash = await sendAndConfirmTransaction(undefined);
//...
```

**Need some help?** Here are a few hints

- [Create a publicKey from a seed](https://solana-labs.github.io/solana-web3.js/classes/PublicKey.html#createWithSeed)
- [Create an account from a seed](https://solana-labs.github.io/solana-web3.js/classes/SystemProgram.html#createAccountWithSeed)

{% hint style="info" %}
You can [**join us on Discord**](https://discord.gg/fszyM7K), if you have questions or want help completing the tutorial.
{% endhint %}

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 👉 Solution

```typescript
// solution
//...
const greetedPubkey = await PublicKey.createWithSeed(
  payer.publicKey,
  GREETING_SEED,
  programId,
);

const lamports = await connection.getMinimumBalanceForRentExemption(
  GREETING_SIZE,
);

const transaction = new Transaction().add(
  SystemProgram.createAccountWithSeed({
    fromPubkey: payer.publicKey,
    basePubkey: payer.publicKey,
    seed: GREETING_SEED,
    newAccountPubkey: greetedPubkey,
    lamports,
    space: GREETING_SIZE,
    programId,
  }),
);
const hash = await sendAndConfirmTransaction(connection, transaction, [payer]);
//...
```

**What happened in the code above?**

- We derive a `PublicKey` from three values: the payer of the transaction, a random seed and the programId.
- Next, we call the system's program `createAccountWithSeed` to create an account:
  - Supplied with the minimal amount of lamports to exempt the account from paying rent.
  - With a predefined public key, the one derived before.
  - Owned by the `programId` then giving permission to the program to perform write access.
- Finally we send and await the transaction confirmation;
- `[payer]` in this case being the account created during the [second tutorial](https://learn.figment.io/tutorials/create-solana-keypair).

{% hint style="info" %}
[Learn more about rent exemption](https://docs.solana.com/developing/programming-model/accounts#rent-exemption)
{% endhint %}

{% hint style="info" %}
[Learn more about the SystemProgram](https://docs.solana.com/developing/runtime-facilities/programs#system-program)
{% endhint %}

---

# ✅ Make sure it works

Once you have the code above saved, click on **Create Greeter**:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-greeter.gif)

---

# 🏁 Conclusion

Now we have an account owned by the program and dedicated to storing the program data. We are ready to go ahead and act on the data: the first natural action is to read the data. Ready?
