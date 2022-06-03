# 🧩 API keys

If you wish to make use of the Pathway content using a private infrastructure provider, you will likely need a valid API key and an endpoint URL to access Secret.

To use an API key, you should copy the contents of the `.env.example` file located in the project root directory (`/learn-web3-dapp/.env.example`) into a new file named `.env.local` (`/learn-web3-dapp/.env.local`). Also, since this file will contain your API key, we have already added it to the `.gitignore`.

{% hint style="info" %}
Easily duplicate the file with the terminal command `cp .env.example .env.local`!
{% endhint %}

You can then paste your unique API key into `.env.local`, as the value for the environment variable `SECRET_API_KEY`.

```yaml
# DataHub API keys
DATAHUB_AVALANCHE_API_KEY=
DATAHUB_CELO_API_KEY=
DATAHUB_NEAR_API_KEY=
DATAHUB_POLKADOT_API_KEY=
DATAHUB_POLYGON_API_KEY=
SECRET_API_KEY=dd2c0d53e7c7de0843e23dd30bf4fcc5
DATAHUB_SOLANA_API_KEY=
```

When connecting to Secret, this pathway defaults to using a helper function which returns the Light Client Daemon (LCD) endpoint URL for the `pulsar-2` testnet. The file containing the `getNodeUrl` helper function is located at `components/protocols/secret/lib/index.ts`.

Note that you can always pass an endpoint URL when instantiating the `CosmWasmClient`, for example:

```typescript
const client = new CosmWasmClient('http://testnet.securesecrets.org:1317/');
```

---

# 👣 Next Steps

If you're using a private infractructure provider, remember to have your API key saved in `/learn-web3-dapp/.env.local`, if you require one. If you are using the default public endpoint (`https://api.pulsar.griptapejs.com/`) you do not require an API key, and you can continue by clicking on the **Next: Connect to Secret** button below.
