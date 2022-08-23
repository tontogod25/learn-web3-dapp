In this tutorial, we will be creating an Avalanche account on the X-Chain using the Avalanche JavaScript API.

Unlike other popular blockchains, Avalanche comes with a set of different chains, each with its own purpose:

- Exchange Chain or **X-Chain** which handles asset transfers.
- Platform Chain or **P-Chain** is for network validators and staking.
- Contract Chain or **C-Chain** handles smart contract execution.

## X-Chain

The X-Chain acts as a decentralized platform for creating and trading digital smart assets, a representation of a real-world resource (such as equity or bonds) with a set of rules that govern its behavior, like "can’t be traded until tomorrow" or "can only be sent to US citizens".

One asset traded on the X-Chain is AVAX. When you issue a transaction to a blockchain on Avalanche, you pay a fee denominated in AVAX.

## P-Chain

The P-Chain is the metadata blockchain on Avalanche and coordinates validators, keeps track of active [subnets](https://support.avax.network/en/articles/4064861-what-is-a-subnet), and enables the creation of new subnets. The P-Chain implements the Snowman [consensus protocol](https://docs.avax.network/learn/platform-overview/avalanche-consensus).

## C-Chain

The C-Chain allows for the creation of smart contracts using the C-Chain’s API, and is an instance of the [Ethereum Virtual Machine](https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture/6413#6413) (EVM) powered by Avalanche.

---

# 🏋️ Challenge

{% hint style="tip" %}
In `pages/api/avalanche/account.ts`, implement the function to create our private key. A private key is used to sign transactions on any Avalanche chain (X/P/C), and for educational purposes we'll use a single private key during the Pathway. To manage the keys we first configure the Keychain, a component for managing private/public key pairs and addresses. You must replace any instances of `undefined` with working code to accomplish this.
{% endhint %}

```typescript
//...
  try {
    const {network} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const keyChain = chain.keyChain();
    const keypair = keyChain.undefined; // There is a useful method to use here
    const secret = undefined;
    const address = undefined;
    res.status(200).json({
      secret,
      address,
    });
  }
//...
```

**Need some help?** Check out these tips

- Using the code completion feature of your favorite code editor, find a method which retrieves a KeyPair object.
- On the keypair instance, call a method to retrieve the `PrivateKey` in string format.
- On the keypair instance, call a method to retrieve the `Address` in string format.
- [**`AvalancheJS` create keypair example**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/createKeypair.ts)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
  try {
    const {network} = req.body;
    const client = getAvalancheClient(network);
    const chain = client.XChain();
    const keyChain = chain.keyChain();
    const keypair = keyChain.makeKey();
    const secret = keypair.getPrivateKeyString();
    const address = keypair.getAddressString();
    res.status(200).json({
      secret,
      address,
    });
  }
//...
```

**What happened in the code above?**

- Calling the `makeKey` method will give us a usable keypair.
- `getPrivateKeyString` retrieves the string-formatted private key.
- `getAddressString` retrieves the string-formatted public key.

{% hint style="tip" %}
Do not forget to fund the newly created wallet using the [Avalanche testnet faucet](https://faucet.avax-test.network/) in order to activate it!
{% endhint %}

---

# ✅ Make sure it works

Once the code in `pages/api/avalanche/account.ts` is complete, Next.js will rebuild the API route. Now click on **Generate a Keypair** to make your account on Avalanche.

---

# 🏁 Conclusion

Nice! Now that you have an identity, it's time to interact with the blockchain.
You want to know the amount of tokens your account holds? Good, this is exactly what the next challenge is - querying Avalanche for an account balance.
