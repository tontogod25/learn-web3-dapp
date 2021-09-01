# 🤔 What is `learn-web3-dapp`?

We made this decentralized application (dApp) to help developers learn about Web 3 protocols. It uses TypeScript, React, and various smart contract languages.

Following along with the [Figment Learn Pathways](https://learn.figment.io/pathways/), you will build up a simple web client using various JavaScript APIs to interact with different blockchain networks. Each protocol is slightly different, but we have attempted to standardize the workflow so that you can quickly get up to speed on networks like Solana, NEAR, Secret and Polygon! 

Learn more about [Figment](https://figment.io/).

# 🧑‍💻 How to use this repo

Clone the repo and install the dependencies with `yarn`:

```
git clone https://github.com/figment-networks/learn-web3-dapp.git
cd learn-web3-dapp
yarn
```

If you encounter any errors during this process, please join our [Discord]() for help.

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

If your setup requires a specific port to allow inbound requests, or if you already have a service running on port 3000 - you can also specify a port with the `--port` flag:

```
yarn dev --port 3001
```

Once the server is running, you should see similar output:

```
yarn run v1.22.10
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from ~/learn-web3-dapp/.env.local
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5
event - compiled successfully
```

You can now view the running application at [http://localhost:3000](http://localhost:3000) (or whichever port you specified)!

We sincerely hope you enjoy the Pathway content and thank you for using `learn-web3-dapp` to learn about blockchain protocols 🚀

 -- The Figment Learn Team
