At this point, we have deployed a smart contract on the Polygon testnet & set the value of its storage. We have a client-side application that's ready to fetch some data from it. We just need to wire up that last part.

---

# 🏋️ Challenge

{% hint style="tip" %}
In the file `components/protocols/polygon/components/steps/Getter.tsx`, implement the `getValue` function.  
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
const getValue = async () => {
  setFetching(true);
  setContractNumber(null);
  try {
    setFetching(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // try to figure out the expected parameters
    const contract = new ethers.Contract(undefined);
    // try to figure out the expected method
    const storage = undefined;
    setContractNumber(storage.toString());
    setFetching(false);
  } catch (error) {
    setFetching(false);
  }
};
```

**Need some help?** Check out these links 👇

- [**Create a Contract using ethers**](https://docs.ethers.io/v5/api/contract/contract/#Contract--creating)
  - You can **console.log `SimpleStorageJson`** to find the contract's `abi` and `address` (through the property `networks`)
- [**How to call a contract's methods on a ethers Contract object**](https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall)
- To read from the blockchain you don't need to spend any tokens so you can just use a provider to create a Contract instance. But to write you will need to create and sign a transaction through Metamask. Use a `signer` to create the Contract object!

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
const getValue = async () => {
  try {
    setFetching(true);
    setContractNumber(null);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      SimpleStorageJson.networks['80001'].address,
      SimpleStorageJson.abi,
      provider,
    );
    const storage = await contract.get();
    setContractNumber(storage.toString());
    setFetching(false);
  } catch (error) {
    setFetching(false);
  }
};
```

**What happened in the code above?**

- We create `Contract` objects using
  - The contract json's address
  - The contract json's abi
  - A web3 provider
- We then call the functions `get()` on this Contract object to operate our decentralized code. The names of the functions must match the ones we defined in our Solidity smart contract, otherwise how would we know which code to execute?

---

# ✅ Make sure it works

Once the code above save you can click and this is what the UI should look like!

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polygon/polygon-getter.gif)

---

# 🏁 Conclusion

Now that we know how to interact with a smart contract we are going to learn how to restore an account from its mnemonic.
