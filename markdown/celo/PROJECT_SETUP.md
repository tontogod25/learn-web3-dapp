# 🧩 DataHub API keys

To make use of the Pathway content, you will require a DataHub account and a valid API key to access Celo via DataHub's infrastructure. [Sign up for a DataHub account](https://datahub-beta.figment.io/signup) and verify your email address.

To use your API key, you must create a new file named `.env.local` in the project root directory: `/learn-web3-dapp/.env.local`, copying the contents of the existing `.env.example` file.

> Easily duplicate the file with the terminal command `cp .env.example .env.local`!

Find your unique API key on the [**DataHub Services Dashboard**](https://datahub.figment.io/). Click on the **Celo** icon in the list of available protocols, then copy your key as shown below:

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/celo/celo-setup.gif)

You can then paste your unique API key into `.env.local`, as the value for the environment variable `DATAHUB_CELO_API_KEY`. This will authenticate you and enable you to make requests to Celo via DataHub:

```yaml
# DataHub API keys
DATAHUB_AVALANCHE_API_KEY=
DATAHUB_CELO_API_KEY=3498ae25f9b1342878cc5baa03bc7243
DATAHUB_NEAR_API_KEY=
DATAHUB_POLKADOT_API_KEY=
DATAHUB_POLYGON_API_KEY=
DATAHUB_SECRET_API_KEY=
DATAHUB_SOLANA_API_KEY=
DATAHUB_TEZOS_API_KEY=
```

# 👣 Next Steps

Once you have your Celo API key saved in `/learn-web3-dapp/.env.local`, you're ready to begin.
Click on the **Next: Connect to Celo** button below.
