Our Contract is on-chain, and we're going to learn how to fetch the data stored on the contract.

{% hint style="working" %}
If you want to learn more about Celo smart contracts, follow the [**Deploy and Interact with Contracts (Remotely)**](https://learn.figment.io/tutorials/hello-contracts) tutorial.
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/celo/getter.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
  try {
    const {contract, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    // Create a new contract instance with the HelloWorld contract info
    const instance = undefined;
    // Call the getName function of the on-chain contract
    const name = undefined;

    res.status(200).json(name);
  }
//...
```

**Need some help?** Check out these links 👇

- [**Interacting with Custom contracts**](https://docs.celo.org/developer-guide/contractkit/usage#interacting-with-custom-contracts)
- [**Web3.js eth contract interface**](https://web3js.readthedocs.io/en/v1.4.0/web3-eth-contract.html)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```tsx
// solution
//...
  try {
    const {contract, network} = req.body;
    const url = getNodeUrl(network);
    const kit = newKit(url);

    const instance = new kit.web3.eth.Contract(
        HelloWorld.abi,
        contract
    );
    const name = await instance.methods.getName().call();

    res.status(200).json(name);
  }
//...
```

**What happened in the code above?**

- First, we create a new instance with the HelloWorld contract info, including the ABI and the `contract` passed in via the request body.
- Then we call the `getName` function of our smart contract, chaining the `call` method, because this requires communication with the blockchain.

---

# ✅ Make sure it works

Once the in `pages/api/celo/getter.ts` is complete, click the button to get the curent value stored in the smart contract. It will be displayed on the page.

---

# 🏁 Conclusion

Now, time for the last challenge! Time to modify the state of the contract and thus the state of the blockchain. Let's go!
