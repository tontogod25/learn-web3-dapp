# 🧩 API keys

**DataHub has discontinued Free accounts**. All Figment Learn pathways now make use of public RPC endpoints only. There is no need to supply an API key to access the public endpoints for NEAR.

If you're using a private infractructure provider, you may require an API key to access nodes via their endpoints. Remember to have your API key saved in `/learn-web3-dapp/.env.local`. You can then reference your API key in the pathway code via `process.env.<SOME_VARIABLE_NAME>`.

If you are using the [NEAR default public endpoints](https://docs.near.org/api/rpc/setup#rpc-endpoint-setup) you do not require an API key, and you can connect directly without any additions to `.env.local`.

{% hint style="tip" %}
If the Next.js development server was running at the time you changed the environment variable's value, you will need to restart the Next.js server to make it aware of the new value. You can do this by pressing `Ctrl+C` in the terminal where the Next.js server is running, then restart it with the command `yarn dev`.
{% endhint %}

# 👣 Next Steps

Click on the **Next: Connect to NEAR** button below.
