Data is stored into an account as a **buffer**. To access the data, we'll have to first unpack this blob of data into a well defined structure. The code below allows our TypeScript program to achieve this goal: deserializing a greeter's buffer into a TypeScript class.

```typescript
// The state of a greeting account managed by the hello world program
class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);
```

{% hint style="info" %}
[Learn more about the borsh library](https://npm.io/package/borsh)
{% endhint %}

---

# 👨‍💻 Challenge

{% hint style="tip" %}
In `pages/api/solana/getter.ts`, complete the code for `getter`. First deserialize the greeter data to a TypeScript class, then access the counter value and pass it to the response object using the `.json()` method as in all previous tutorials.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
if (accountInfo === null) {
  throw new Error('Error: cannot find the greeted account');
}

// Find the expected parameters.
const greeting = borsh.deserialize(undefined);

// A little helper
console.log(greeting);

// Pass the counter to the client-side as JSON
res.status(200).json(undefined);
//...
```

**Need some help?** Here are a few hints

- [Read about the deserialize method](https://npm.io/package/borsh)

{% hint style="info" %}
You can [**join us on Discord**](https://discord.gg/fszyM7K), if you have questions or want help completing the tutorial.
{% endhint %}

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 👉 Solution

```typescript
// solution
//...
if (accountInfo === null) {
  throw new Error('Error: cannot find the greeted account');
}

const greeting = borsh.deserialize(
  GreetingSchema,
  GreetingAccount,
  accountInfo.data,
);

res.status(200).json(greeting.counter);
//...
```

**What happened in the code above?**

- First, we pass the **Schema** and the **Account**'s key (here key refers to the key of a map struct, **not** a public or private key), and then the binary data stored into **greeter**.
- Finally, we just need to call the property `counter` of `greeting` to pass the value as JSON back to the client-side.

---

# ✅ Make sure it works

Once you have the code above saved, click on **Get Greeting** and watch the magic happen:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/solana/solana-getter.gif)

---

# 🏁 Conclusion

Simply getting the number of greetings is not enough, we'd like to also _send_ a greeting to our contract. We're going to learn how to do it in the next step. Ready?
