The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data is transferred from one to the other.

The main difference here is in the protocol. To connect to NEAR, we'll be using `json-rpc`:

- `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
- `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/near/connect.ts`, implement `connection` by creating a `Connection` instance and getting the API version. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
try {
  const config = configFromNetwork(network);
  const near = undefined;
  const provider = undefined
  const status = undefined;
  return res.status(200).json(status.version.version);
}
```

**Need some help?** Check out these links 👇

- [Creating a `Connection` instance](https://near.github.io/near-api-js/modules/connect.html)
- [Provider property of `Connection` Class](https://near.github.io/near-api-js/classes/connection.connection-1.html#provider)
- [Status method of `Provider` class](https://near.github.io/near-api-js/classes/providers_json_rpc_provider.jsonrpcprovider.html#status)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
try {
  const config = configFromNetwork(network);
  const near = await connect(config);
  const provider = near.connection.provider;
  const status = await provider.status();
  return res.status(200).json(status.version.version);
}
```

**What happened in the code above?**

- `configFromNetwork` takes the network identifier such as _mainnet_ or _testnet_ and returns a `config` object containing the correct URLs.
- `connect` takes the `config` object and returns an instance of `Near`, which represents the connection.
- `near.connection.provider` returns a `JsonRpcProvider` object allowing us to make JSON-RPC calls to a node.
- The `status` method allows us to retrieve the desired information from the properties of the object that it returns.
- Finally, we can send back the `status.version.version` to the client-side as JSON.

---

# ✅ Make sure it works

Once the code in `pages/api/near/connect.ts` is complete, click the blue button to connect to NEAR & display the current version.

---

# 🏁 Conclusion

Well done! Your fluency in the NEAR dialect of Web 3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the NEAR network. Ready to take the next step forward?
