# 🤔 What is `learn-web3-dapp`?

We made this decentralized application (dApp) to help developers learn about Web 3 protocols. It's a Next.js app that used React, TypeScript and various smart contract languages (mostly Solidity and Rust).

We will guide you to build up a simple web client using the various blockchain's JavaScript SDKs to interact with their networks. Each protocol is slightly different, but we have attempted to standardize the workflow so that you can quickly get up to speed on networks like Solana, NEAR, Polygon and more!

**Supported** ✅
- Solana  
- Polygon  
- Avalanche  
- NEAR  
- Tezos  
- Secret  
- Polkadot  

**Coming soon!** 🔜
- The Graph  
- Ceramic  
- Arweave  

Learn more about [Figment](https://figment.io/) and [Figment Learn](https://learn.figment.io/)

![Screen Shot 2021-09-29 at 11 14 55 AM](https://user-images.githubusercontent.com/206753/135325747-330e9b28-14ee-4a32-9d7c-4216f82dd8c7.png)

# 🧑‍💻 Get started

Make sure you have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started/install) installed. Then clone the repo and run the `yarn` command to install the dependencies:

```
git clone https://github.com/figment-networks/learn-web3-dapp.git
cd learn-web3-dapp
yarn
```

If you encounter any errors during this process, please join our [Discord](https://discord.gg/fszyM7K) for help.

# 🧩 DataHub API keys

To make use of the Pathway content, you will require a DataHub account and a valid API key for the protocol you wish to access via DataHub's infrastructure.
[Sign up for a DataHub account](https://auth.figment.io/sign_up) and verify your email address, then visit the [DataHub Services Dashboard](https://datahub.figment.io/) and select the protocol you want to access. You will then be able to copy your personal API key.

You will need to create a new file in the project root directory `~/learn-web3-dapp/.env.local`, copying the contents of the existing `.env.example` file.
Your API key needs to be pasted into `.env.local` so that you can authenticate your connections with DataHub.

# 💻 Running the development server

Start the Next.js development server on the default port 3000 with:

```
yarn dev
```

Once the server is running, you should see similar output:

```
yarn run v1.22.10
$ yarn dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from ~/learn-web3-dapp/.env.local
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5
event - compiled successfully
```

You can now view the running application at [http://localhost:3000](http://localhost:3000) (or whichever port you specified)!

We sincerely hope you enjoy the Pathway content and thank you for using `learn-web3-dapp` to learn about blockchain protocols 🚀

[Join us on Discord](https://discord.com/invite/fszyM7K) if you have any questions!

-- The Figment Learn Team
