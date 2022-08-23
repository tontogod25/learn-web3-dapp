# 🦊 Install Metamask

Make sure you have the [Metamask](https://metamask.io/) browser extension installed!

---

# 🦺 Safety disclaimers

{% hint style="info" %}
If you **ALREADY** have Metamask installed and are using it for a hot wallet, we _**strongly recommend**_ creating an entirely new wallet in Metamask for the purposes of these tutorials. Figment Learn wants nothing to do with your personal keys. We do not want any accidents involving anybody's cryptocurrency! Again, you _must not continue_ until you take care of this.  
{% endhint %}

{% hint style="danger" %}
If you **DO NOT** already have Metamask installed, welcome to the wonderful world of Web 3!  
The first piece of advice we will give you is to make _absolutely sure that you write down the_ [**Secret Recovery Phrase**](https://community.metamask.io/t/what-is-a-secret-recovery-phrase-and-how-to-keep-your-crypto-wallet-secure/3440) that is generated during Metamask's initial setup. Do not store it in a digital format. Do not share it with anybody. Please do keep it accessible to yourself because you will be using it during the pathway.
{% endhint %}

---

# ⛓ Add the Mumbai testnet to Metamask

The first task is to connect to the Polygon Mumbai testnet by adding it to the list of RPC endpoints in Metamask. Click on the Fox head icon in your web browser to open the popup, and then follow this workflow to complete the process :

- Click on the current network at the top of the Metamask popup (by default is says "Ethereum Mainnet")
- Scroll down and click on "Custom RPC"
- Fill in the form:
  - Network Name: `Polygon Mumbai`
  - New RPC URL: `https://rpc-mumbai.maticvigil.com/`
  - Chain ID: `80001`
  - Currency Symbol: `MATIC`
  - Block Explorer URL : `https://mumbai.polygonscan.com`
- Double check the information, then click on the Save button.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polygon/add_mumbai.png)

We use the testnet for development before moving into production on the main network or "mainnet".

If you experience issues with the maticvigil.com endpoint, use one of the other endpoints listed at [https://docs.polygon.technology/docs/develop/network-details/network/](https://docs.polygon.technology/docs/develop/network-details/network/) - click on Mumbai-Testnet below the Network heading to view them.

---

# 🧩 API keys

**DataHub has discontinued Free accounts**. All Figment Learn pathways now make use of public RPC endpoints only. There is no need to supply an API key to access the public endpoints for Polygon.

If you're using a private infractructure provider, you may require an API key to access nodes via their endpoints. Remember to have your API key saved in `/learn-web3-dapp/.env.local`. You can then reference your API key in the pathway code via `process.env.<SOME_VARIABLE_NAME>`.

If you are using the [Polygon default public endpoints](https://docs.polygon.technology/docs/develop/network-details/network/) you do not require an API key, and you can connect directly without any additions to `.env.local`.

{% hint style="tip" %}
If the Next.js development server was running at the time you changed the environment variable's value, you will need to restart the Next.js server to make it aware of the new value. You can do this by pressing `Ctrl+C` in the terminal where the Next.js server is running, then restart it with the command `yarn dev`.
{% endhint %}

---

# 👣 Next Steps

Click on the **Next: Connect to Polygon** button below.
