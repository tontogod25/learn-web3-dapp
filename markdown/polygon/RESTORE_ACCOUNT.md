At the beginning of this journey into Polygon, we generated a mnemonic. Now we're going to learn how to restore a wallet from a mnemonic and how to derive the address and the private key when the wallet has been restored.

---

# 🏋️ Challenge

{% hint style="tip" %}
In the file `components/protocols/polygon/components/steps/Restore.tsx`, implement the `restore` function. Using `ethers`, look for `Wallet`, then when the wallet has been regenerated try to deduce which property we're going to call in order to display the address and the private key, finally verify than the generated key matches the existing one.  
{% endhint %}

**Take a few minutes to figure this out.**

```tsx
const restore = () => {
  setError(null);
  setAddress(null);
  try {
    const wallet = undefined;
    const selectedAddress = window.ethereum.selectedAddress;
    if (undefined === selectedAddress) {
      setAddress(undefined);
      setSecret(undefined);
    } else {
      setError('Unable to restore account');
    }
  } catch (error) {
    setError('Invalid mnemonic');
  }
};
```

Need some help? Check out these links 👇

- [**Create Wallet using ethers**](https://docs.ethers.io/v5/api/signer/#Wallet)
- [**Properties of a Wallet**](https://docs.ethers.io/v5/api/signer/#Wallet--properties)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```javascript
// solution
const restore = () => {
  setAddress(null);
  setSecret(null);
  try {
    const wallet = ethers.Wallet.fromMnemonic(value.trim());
    const selectedAddress = window.ethereum.selectedAddress;
    if (wallet && wallet.address.toLocaleLowerCase() === selectedAddress) {
      setAddress(wallet.address.toLocaleLowerCase());
      setSecret(wallet.privateKey.toLocaleLowerCase());
    } else {
      setError('Unable to restore account');
    }
  } catch (error) {
    setError('Invalid mnemonic');
  }
};
```

**What happened in the code above?**

- First, we need to call `fromMnemonic` method of `Wallet` class.
- Next, we compare if the restored address matches the existing one.
- Next, we store the address in the component state using `setAddress` to display it in the UI.
- Finally, we do the same for the private key - storing it in the component state with `setSecret`.
- **IMPORTANT**: If you have selected any address in Metamask other than the first address, the if statement will be false.

---

# ✅ Make sure it works

When you have completed the code:

- Copy-Paste your **mnemonic**
- Click on **Restore Account**

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/polygon/polygon-restore.gif)

---

# 🏁 Conclusion

Congratulations! We have gone from zero to **Polygon**, covering all the most fundamental concepts needed for developers to succeed in using **Polygon**. From connecting to the network to interacting with smart contracts, you have completed coding challenges and created a functional yet basic dApp.

From here, there are many ways to increase your skills with Web 3 development. We recommend following some of the other Tutorials and Pathways on Figment Learn, to discover what makes the other network protocols unique.

If you are an experienced developer, you are welcome to contribute tutorials for **Polygon** and earn some **MATIC** tokens! Check out our tutorial [contribution guidelines](../../../other/tutorial-guidelines/) to get started.

If you had any difficulties following this tutorial or simply want to discuss Polygon with other developers you can join [our Discord](https://discord.gg/fszyM7K) or head over to our [community forums](https://community.figment.io).
