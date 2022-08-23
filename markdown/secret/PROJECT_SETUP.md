# 🧩 API keys

**DataHub has discontinued Free accounts**. All Figment Learn pathways now make use of public RPC endpoints only. There is no need to supply an API key to access the public endpoints for Secret Network.

If you're using a private infractructure provider, you may require an API key to access nodes via their endpoints. Remember to have your API key saved in `/learn-web3-dapp/.env.local`. You can then reference your API key in the pathway code via `process.env.<SOME_VARIABLE_NAME>`.

If you are using the [Secret Network default public endpoints](https://docs.scrt.network/secret-network-documentation/development/api-endpoints) you do not require an API key, and you can connect directly without any additions to `.env.local`.

{% hint style="tip" %}
If the Next.js development server was running at the time you changed the environment variable's value, you will need to restart the Next.js server to make it aware of the new value. You can do this by pressing `Ctrl+C` in the terminal where the Next.js server is running, then restart it with the command `yarn dev`.
{% endhint %}

When connecting to Secret, this pathway defaults to using a helper function which returns the Light Client Daemon (LCD) endpoint URL for the `pulsar-2` testnet. The file containing the `getNodeUrl` helper function is located at `components/protocols/secret/lib/index.ts`.

Note that you can always pass an endpoint URL when instantiating the `CosmWasmClient`, for example:

```typescript
const client = new CosmWasmClient('http://testnet.securesecrets.org:1317/');
```

---

# 👣 Next Steps

Continue by clicking on the **Next: Connect to Secret** button below.
