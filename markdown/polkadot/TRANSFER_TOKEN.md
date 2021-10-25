It’s time to submit your first transaction on Polkadot! In this tutorial, we will connect to a Westend node hosted by DataHub to transfer some testnet tokens. As you remember from previous tutorials, we funded our account on the **WESTEND** testnet with 1 **WND**. Now let’s try to transfer some tokens.

---

# Challenge

{% hint style="tip" %}
In `pages/api/polkadot/transfer.ts`, implement the function and try to transfer an amount of tokens. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
    // Initialize account from the mnemonic
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);

    // Initialize account from the mnemonic
    const recipient = keyring.addFromUri('//Alice');
    const recipientAddr = recipient.address

    // Transfer tokens
    const transfer = undefined;
    const hash = await transfer.signAndSend(account);

    await provider.disconnect();
    res.status(200).json(hash.toString())
  }
//...
```

**Need some help?** Check out these links

- [**Polkadot.js documentation**](https://polkadot.js.org/docs/)
- [**Code examples**](https://polkadot.js.org/docs/api/examples/promise/)

{% hint style="info" %}
You can [**join us on Discord**](https://discord.gg/fszyM7K), if you have questions or want help completing the tutorial.
{% endhint %}

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# Solution

```typescript
// solution
//...
    // Initialize account from the mnemonic
    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);

    // Initialize account from the mnemonic
    const recipient = keyring.addFromUri('//Alice');
    const recipientAddr = recipient.address;

    // Transfer tokens
    const transfer = await api.tx.balances.transfer(recipientAddr, txAmount);
    const hash = await transfer.signAndSend(account);

    res.status(200).json(hash.toString());
  }
//...
```

**What happened in the code above?**

- First, we need to instantiate our connection to the Polkadot API.
- Next, we call the `transfer` method of the `tx.balances` module, passing:
  - The recipient's address, from a [dev account](https://polkadot.js.org/docs/keyring/start/suri#dev-accounts) named "Alice".
  - The amount to transfer.
- Then we _sign and send_ the transaction passing our account as an argument to the `signAndSend` method - This specifies our account as the one paying the transfer fee, as well as signing the transaction.

---

# Make sure it works

Once the code is complete and the file is saved, Next.js will rebuild the API route.

- Fill in the amount of **Planck** you want to send.
- Click on **Submit Transfer**.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polkadot/polkadot-transfer.gif)

---

# Conclusion

Congratulations! You have now completed the Polkadot Pathway!

There are many things that are beyond the scope of this Pathway, but the links provided to expand on some of the concepts contained in the tutorials should at least provide ample starting points for further study. Consider refining and playing with the code from the Pathway, to see what can be built out of these foundational blocks of Polkadot.

If you had any difficulties following this tutorial or simply want to discuss Polkadot with other developers you can join [our Discord](https://discord.gg/fszyM7K) or head over to our [community forums](https://community.figment.io).
