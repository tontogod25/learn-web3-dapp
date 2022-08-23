In this tutorial, we will connect to a Polkadot node using a [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) Provider. WebSockets make it possible to open a two-way interactive communication session between the user's browser and a server.

Polkadot has built a [JavaScript library](https://github.com/polkadot-js/api) to help developers interface easily with its API. The documentation for Polkadot.js can be found at [https://polkadot.js.org/docs/](https://polkadot.js.org/docs/).

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/polkadot/connect.ts`, implement the function and try to establish your first connection to the Polkadot network. You must replace the instances of `undefined` with working code to accomplish this.  
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
  try {
    const {network} = req.body;
    const url = getNodeUrl(network);
    const provider = new WsProvider(url);
    const api = undefined;
    const rawVersion = undefined;
    const version = rawVersion.toHuman();
    await provider.disconnect();
    res.status(200).json(version);
  }
//...
```

**Need some help?** Check out these links 👇

- [**Basics & Metadata**](https://polkadot.js.org/docs/api/start/basics)
- [**Providers**](https://polkadot.js.org/docs/api/start/create#providers)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {network} = req.body;
    const url = getNodeUrl(network);
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const rawVersion = await api.rpc.system.version();
    const version = rawVersion.toHuman();
    res.status(200).json(version);
  }
//...
```

**What happened in the code above?**

- The `getSafeUrl` helper function constructs an endpoint URL for either Mainnet or the Westend testnet - It can also be used with the `force` option to return the public Westend RPC endpoint as a fallback.
- With the endpoint URL, we can create a new `WsProvider` instance.
- Then we use `ApiPromise.create` to initialize the API, passing the provider as an object.
- Using the `rpc` module, we can then query the `system.version` method.
- To display a human readable string of the version number, we use the `toHuman` method.
- Finally, we send the `version` back to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/polkadot/connect.ts` is complete, click the blue button to connect to Polkadot & display the current version.

---

# 🏁 Conclusion

In this tutorial you’ve learned how to use the [Polkadot.js](https://polkadot.js.org/docs/) package to connect to a Polkadot node. You also learned how to run a simple query to test that connection.
