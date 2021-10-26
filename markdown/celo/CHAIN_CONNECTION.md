Celo is an open platform that makes financial tools accessible to anyone with a mobile phone. There are especially useful toolkits and code libraries when it comes to developing [dApps](https://en.wikipedia.org/wiki/Decentralized_application) on the Celo network. [ContractKit](https://github.com/celo-org/celo-monorepo/tree/master/packages/sdk/contractkit), for example - This is a JavaScript package that makes it easy to interact with the Celo network and the core Celo smart contracts as well as custom ones built by the community.

We are now all set up with our application and we can start writing some JavaScript code. The first step here is to connect to the Celo **Alfajores** network using ContractKit.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/celo/connect.ts`, implement the function and try to establish your first connection to the Celo network. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const url = getSafeUrl();
    const kit = undefined;
    const version = undefined;
    res.status(200).json(version.slice(5, 11));
  }
//...
```

**Need some help?** Check out these links 👇

- [**ContractKit usage**](https://docs.celo.org/developer-guide/contractkit/usage)
- [**To start working with ContractKit you need a kit instance**](https://docs.celo.org/developer-guide/sdk-code-reference/summary-2/modules/_kit_#functions)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const url = getSafeUrl();
    const kit = newKit(url);
    const version = await kit.web3.eth.getNodeInfo();
    res.status(200).json(version.slice(5, 11));
  }
//...
```

**What happened in the code above?**

- First, we create a new `kit` instance. This is our connection to Celo, which we will use throughout the Pathway.
- Next, using `web3.eth` we can access a proxy of the [**web3.js - Ethereum Javascript API**](https://web3js.readthedocs.io/en/v3.0.0-rc.5/)
- Finally, calling the `getNodeInfo` method we can query the node to return a slice of the protocol version.

---

# ✅ Make sure it works

Once the code is complete and the file has been saved, refresh the page to see it update & display the current version.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/celo/celo-connect.gif)

Congratulations, you have successfully made a function that can connect to the Celo node! This can be applied either on the client-side or server-side, depending on your needs.

---

# 🏁 Conclusion

In this tutorial you’ve learned how to use the ContractKit package and DataHub to connect to the Celo node. You also had a chance to run one simple query to test that connection.
