Like with most Web 3 protocols, transactions on Solana happen between **accounts**. To create an account, a client generates a **keypair** which has a **public key** (or **address**, used to identify and lookup an account) and a **secret key** used to sign transactions.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/solana/keypair.ts`, implement `keypair` and parse the keypair to extract the address as a string. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
const keypair = undefined;
const address = undefined;
const secret = JSON.stringify(Array.from(keypair.secretKey));
//...
```

**Need some help?** Check out these links 👇

- [Generate a `Keypair`](https://solana-labs.github.io/solana-web3.js/classes/Keypair.html#constructor)
- [Convert a `PublicKey` to a string](https://solana-labs.github.io/solana-web3.js/classes/PublicKey.html#tostring)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
const keypair = Keypair.generate();
const address = keypair?.publicKey.toString();
const secret = JSON.stringify(Array.from(keypair.secretKey));
//...
```

**What happened in the code above?**

- We used the `Keypair` from `@solana/web3.js` to `generate()` a keypair.
- Parse the keypair object to extract the public key (as a string) using `keypair?.publicKey.toString()`.
- The secret key is kept in array format, so to send it back to the client-side we need to remember to use `JSON.stringify`.
- There's the nullish coalescing operator and optional chaining operator `?.` again! We don't want to return undefined values to the client-side.

---

# ✅ Make sure it works

Once the code is complete and the file is saved, Next.js will rebuild the API route. Now click on **Generate a Keypair** and you should see:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-keypair.gif)

**Click on "Generate a Keypair" again. And again. And again!** Each time it will generate a new one with virtually no risk that someone else creates the same one as you. That's because the domain of possible addresses is so vast that the probability of two identical addresses being generated is ridiculously small.

---

# 🏁 Conclusion

Now that we have an account, we can fund it so we can start playing around with tokens!
