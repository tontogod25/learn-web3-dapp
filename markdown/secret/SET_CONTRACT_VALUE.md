Our contract is on-chain, and we're going to learn how to modify the value stored in the state of the contract.

{% hint style="working" %}
If you want to learn more about Secret smart contracts, follow the [**Developing your first secret contract**](https://learn.figment.io/tutorials/creating-a-secret-contract-from-scratch) tutorial.
{% endhint %}

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/secret/chains/holodeck-2)
{% endhint %}

Before focusing on altering a value on the smart contract, let's take a look at the fees object:

```typescript
const customFees = {
  exec: {
    amount: [{amount: '500000', denom: 'uscrt'}],
    gas: '500000',
  },
};
```

- This `customFees` object stores the predefined amount of **uSCRT** to pay in order to **execute** a write-access method of the smart contract.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/setter.ts`, implement the default function. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
// Increment the counter
const handleMsg = {increment: {}};
const response = undefined;
//...
```

**Need some help?** Check out these links 👇

- [**Contract example**](https://github.com/enigmampc/SecretJS-Templates/tree/master/5_contracts)
- [**`execute()`**](https://github.com/enigmampc/SecretNetwork/blob/7adccb9a09579a564fc90173cc9509d88c46d114/cosmwasm-js/packages/sdk/src/signingcosmwasmclient.ts#L409)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// Increment the counter
const handleMsg = {increment: {}};
const response = await client.execute(contract, handleMsg);
//...
```

**What happened in the code above?**

- We're calling the `execute` method of the `SigningCosmWasmClient`, passing to it:
  - The `contract`, which is the contract address.
  - The `{ increment: {} }` object which represents the name of the method we are calling and the parameters we're passing to it. Again, we are passing an empty object as there are no arguments.

---

# ✅ Make sure it works

Once you have the code above saved, click the button and watch the magic happen:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/secret/secret-setter.gif)

---

# 🏁 Conclusion

Congratulations, you have completed the Secret Pathway! You have successfully deployed and interacted with a smart contract on the Secret Network testnet using DataHub.

While we have only covered a very small area of contract development you are more than welcome to continue exploration and experiments on your own, feel free to check out the [**Secret Network Developers**](https://scrt.network/developers) site for more examples and tutorials.

If you had any difficulties following this tutorial or simply want to discuss Secret Network and DataHub tech with us you can join [**our community**](https://discord.gg/fszyM7K) today!

If you had any difficulties following this tutorial or simply want to discuss Secret with other developers you can join [our Discord](https://discord.gg/fszyM7K) or head over to our [community forums](https://community.figment.io). We also invite you to join the Secret community on their [Discord server](http://chat.scrt.network) and on the [Secret Forum](http://forum.scrt.network) to go deeper into Secret development.
