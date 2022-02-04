# 🧩 DataHub API keys

To make use of the Pathway content, you will require a DataHub account and a valid API key to access Polkadot via DataHub's infrastructure. [Sign up for a DataHub account](https://datahub-beta.figment.io/signup) and verify your email address.

To use your API key, you must create a new file named `.env.local` in the project root directory: `/learn-web3-dapp/.env.local`, copying the contents of the existing `.env.example` file.

> Easily duplicate the file with the terminal command `cp .env.example .env.local`!

Find your unique API key on the [**DataHub Services Dashboard**](https://datahub.figment.io/). Click on the **Polkadot** icon in the list of available protocols, then copy your key as shown below:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polkadot/polkadot-setup.gif)

You can then paste your unique API key into `.env.local`, as the value for the environment variable `DATAHUB_POLKADOT_API_KEY`. This will authenticate you and enable you to make requests to Polkadot via DataHub:

```yaml
# DataHub API keys
DATAHUB_AVALANCHE_API_KEY=
DATAHUB_CELO_API_KEY=
DATAHUB_NEAR_API_KEY=
DATAHUB_POLKADOT_API_KEY=9f40361b6a3253e577376495c580b700
DATAHUB_POLYGON_API_KEY=
DATAHUB_SECRET_API_KEY=
DATAHUB_SOLANA_API_KEY=
DATAHUB_TEZOS_API_KEY=
```

---

# 👣 Next Steps

Once you have your Polkadot API key saved in `/learn-web3-dapp/.env.local`, you're ready to begin.
Click on the **Next: Connect to Polkadot** button below.
