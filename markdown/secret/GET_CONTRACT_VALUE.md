Our contract is on-chain, and we're going to learn how to fetch the count stored on the contract.

{% hint style="working" %}
If you want to learn more about Secret smart contracts, follow the [**Developing your first secret contract**](https://learn.figment.io/tutorials/creating-a-secret-contract-from-scratch) tutorial.
{% endhint %}

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/secret/chains/supernova-2)
{% endhint %}

Before focusing on retrieving a value from the smart contract, let's take a look at the fees object:

```typescript
const customFees = {
  send: {
    amount: [{amount: '80000', denom: 'uscrt'}],
    gas: '80000',
  },
};
```

- This `customFees` object stores the predefined amount of **uSCRT** to pay in order to **send** a query to the smart contract.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/getter.ts`, complete the code of the default function. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
  // Get the stored value
  console.log('Querying contract for current count');
  let response = undefined.
  let count = response.count as number
//...
```

**Need some help?** Check out these links 👇

- [**Contract example**](https://github.com/enigmampc/SecretJS-Templates/tree/master/5_contracts)
- [**`queryContractSmart()`**](https://github.com/enigmampc/SecretNetwork/blob/7adccb9a09579a564fc90173cc9509d88c46d114/cosmwasm-js/packages/sdk/src/cosmwasmclient.ts#L400)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// Get the stored value
console.log('Querying contract for current count');
let response = await client.queryContractSmart(contractId, {get_count: {}});
let count = response.count as number;
//...
```

**What happened in the code above?**

- We're calling the `queryContractSmart` method of the client, passing to it:
  - The `contractId`, which is the contract address.
  - The `{ get_count: {} }` object which represents the name of the method we are calling and the parameters we're passing to it. In this case, there are no arguments passed to `get_count`, but we must still pass an empty object: `{}`.

---

# ✅ Make sure it works

Once the code in `pages/api/secret/getter.ts` is complete, click **Get the stored value** to query the smart contract and display the value.

---

# 🏁 Conclusion

Now, time for the last challenge! Time to modify the state of the contract and thus the state of the blockchain. Let's go!
