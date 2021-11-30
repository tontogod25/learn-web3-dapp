We won't go through the process of reviewing the smart contract code base, compiling it or testing it. We will focus instead on how one can deploy a smart contract using the `secretjs` library. To do this, we're going to use a pre-compiled smart contract, you can find it under `./contract/secret/contract.wasm`.

Our contract implements a simple counter. The contract is created with a parameter for the initial count and allows subsequent incrementing:

- The `get_count` function returns the value of the counter stored on the contract.
- The `increment` function increases the value of the counter stored on the contract by 1.

{% hint style="working" %}
If you want to learn more about Secret smart contracts, follow the [**Developing your first secret contract**](https://learn.figment.io/tutorials/creating-a-secret-contract-from-scratch) tutorial.
{% endhint %}

{% hint style="danger" %}
You could experience some issues with the availability of the network [**Click here to check the current status**](https://secretnodes.com/secret/chains/supernova-2)
{% endhint %}

Before focusing on the deployment instructions, let's take a look at some important global variables:

```typescript
const CONTRACT_PATH = './contracts/secret/contract.wasm';

const customFees = {
  upload: {
    amount: [{amount: '2000000', denom: 'uscrt'}],
    gas: '2000000',
  },
  init: {
    amount: [{amount: '500000', denom: 'uscrt'}],
    gas: '500000',
  },
};
```

- `CONTRACT_PATH` is pointing to the location of the optimized **WebAssembly** version of the smart contract.
- The `customFees` object stores the predefined amount of fees to pay in order to **upload** and **initialize** the smart contract. [Click here](https://github.com/enigmampc/SecretNetwork/blob/7adccb9a09579a564fc90173cc9509d88c46d114/cosmwasm-js/packages/sdk/src/signingcosmwasmclient.ts#L48) to check out the default fee table in the `SigningCosmWasmClient` source.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/secret/deploy.ts`, implement the default function. Upload your first smart contract on the **Secret** network. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
// Upload the contract wasm
const wasm = fs.readFileSync(CONTRACT_PATH);
const uploadReceipt = await client.undefined;
if (!uploadReceipt) {
  throw new Error('uploadReceipt error');
}
// Get the code ID from the receipt
const {codeId} = uploadReceipt;

// Create an instance of the Counter contract, providing a starting count
const initMsg = {count: 101};
const receipt = undefined;
//...
```

**Need some help?** Check out these links 👇

- [**Contract example**](https://github.com/enigmampc/SecretJS-Templates/tree/master/5_contracts)
- [**The `upload` function**](https://github.com/enigmampc/SecretNetwork/blob/7adccb9a09579a564fc90173cc9509d88c46d114/cosmwasm-js/packages/sdk/src/signingcosmwasmclient.ts#L208)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
// Upload the contract wasm
const wasm = fs.readFileSync(CONTRACT_PATH);
const uploadReceipt = await client.upload(wasm, {});
if (!uploadReceipt) {
  throw new Error('uploadReceipt error');
}
// Get the code ID from the receipt
const {codeId} = uploadReceipt;

// Create an instance of the Counter contract, providing a starting count
const initMsg = {count: 101};
const receipt = await client.instantiate(codeId, initMsg, address.slice(6));
//...
```

**What happened in the code above?**

- First, we upload the contract using `upload` method of the `SigningCosmWasmClient`.
- Next, we destructure the `uploadReceipt` response object to get the `codeId` of the deployed contract
- Finally, we instantiate the contract using `instantiate` method of the `SigningCosmWasmClient`, passing:
  - The `codeId`.
  - The `initMsg` contract method to instantiate the storage with a value of `101`.
  - A label, which needs to be unique, which is why we use a slice of the address.
  - Optionally, we could also include a memo, a transfer amount, fees, and a code hash. For this example, these arguments are unnecessary.

---

# ✅ Make sure it works

Once the code in `pages/api/secret/deploy.ts` is complete, click on **Deploy Contract** to send the compiled smart contract to the network.

---

# 🏁 Conclusion

Now that we have deployed a smart contract, let's interact with it! In the following tutorials, we will look at how to use both view and change functions.
