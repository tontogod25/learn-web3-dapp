Our contract is on-chain, and we're going to learn how to modify the value stored in the state of the contract.

{% hint style="working" %}
If you want to learn more about Celo smart contracts, follow the [**Deploy and Interact with Contracts (Remotely)**](https://learn.figment.io/tutorials/hello-contracts) tutorial.
{% endhint %}

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/celo/setter.ts`, implement the default function. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
//...
  try {
    const { secret, newMessage, contract, address } = req.body;
    const url = getSafeUrl();
    const kit = newKit(url);
    kit.addAccount(secret);

    // Create a new contract instance with the HelloWorld contract info
    const instance = undefined;
    // Call the setName function of our contract
    const txObject = undefined;
    // Send a transaction Object to modify the state of our contract
    let tx = undefined;

    let receipt = await tx.waitReceipt();

    res.status(200).json(receipt.transactionHash);
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
    const { secret, newMessage, contract, address } = req.body;
    const url = getSafeUrl();
    const kit = newKit(url);
    kit.addAccount(secret);

    // Create a new contract instance with the HelloWorld contract info
    const instance = new kit.web3.eth.Contract(
        HelloWorld.abi,
        contract
    );

    const txObject = await instance.methods.setName(newMessage);
    let tx = await kit.sendTransactionObject(txObject, { from: address });

    let receipt = await tx.waitReceipt();

    res.status(200).json(receipt.transactionHash);
  }
//...
```

**What happened in the code above?**

- First, we create a new instance with the HelloWorld contract info.
- Next, we call the `setName` function of our smart contract
- Finally, we create a transaction to execute this function with `sendTransactionObject`, passing in:
  - The transaction object (`txObject`) containing the properly formatted call to the contract method.
  - An object with the `from` property, the address which will pay the fees for the transaction.
- Boom! Wait for confirmation with `waitReceipt` and return the transaction hash to the client-side as JSON.

---

# ✅ Make sure it works

Once you have the code above saved, click the button and watch the magic happen:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/celo/celo-setter.gif)

---

# Conclusion

Congratulations! You've completed the Celo Pathway. In this series of tutorials, we learned quite a lot! We connected to Celo; created and funded an account on the Alfajores testnet; transferred and swapped tokens; then deployed a smart contract with few lines of JavaScript code and called two methods on that smart contract.

We have only covered a very small portion of smart contract development, however there are many existing Solidity resources. We invite you to keep experimenting on your own, and we will be providing more advanced Celo tutorials shortly to help you bring your knowledge and skills to the next level.

If you had any difficulties following this tutorial or simply want to discuss Celo with other developers you can join [our Discord](https://discord.gg/fszyM7K) or head over to our [community forums](https://community.figment.io).
