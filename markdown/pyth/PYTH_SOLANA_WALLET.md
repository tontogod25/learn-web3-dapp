Now that we are able to get Pyth price data, we need to take a detour away from Pyth for a moment to get our account interface figured out. The liquidation bot is going to need some tokens to trade on our behalf! We want to be able to leverage that data and interact with a DEX to swap tokens. We're going to look at how to implement a display of our token balances on the frontend, so that we can see the changes as the liquidation bot is performing the swaps.

We have two different displays to consider: The **mock wallet** which is not connected to Solana, to be used for testing purposes. And the **live wallet** that pulls data from an existing, funded account on Solana to be used on either devnet or mainnet.

_Remember the safety information about the risks of using real SOL from the introduction_!

---

# 🎠 Playground time

There's a comprehensive explanation of the code we are using in the `Wallet.tsx` component below. For now, just play around with the actual component on the right side of the screen. It's a good opportunity to familiarize yourself with the display. There are default balance values, and you can switch between the **mock wallet** and the **live wallet**.

We assume that **you _will not_ want to use an account containing real SOL on mainnet** with this project as-is. There are no safeguards in this code. Don't be alarmed, we just want to be very clear on that point! It's quite easy to tell the difference between the mock and live wallet displays. Only the mock wallet can be reset, _which is only truly relevant for testing_. There is no way to reset balances on a live account (immutable public ledgers and all 😉).

Once you click the toggle over to the **live wallet**, you'll notice some changes:

- The shortened version of a randomly generated public key is displayed. Hover your cursor over it for a tooltip showing the entire public key.
- You can switch between devnet and mainnet with the toggle switch that replaces the "Reset Wallet" button.
- A textinput is included for you to enter a private key, which will then display the associated public key & any SOL, USDC or ORCA tokens owned by that keypair.

We default to using devnet. You should also notice that the balance values change to zero when switching to the **live wallet** for the first time, since our randomly generated default account has not been funded. We'll explain how to get some devnet SOL in a moment!

---

# 🔐 Getting your private key

{% hint style="tip" %}
Private keys are part of your Solana keypair, such as the one you'll create using the Phantom wallet in just a moment. The [base58 encoded](https://medium.com/nakamo-to/what-is-base58-c6c2db7808f3) secret key is commonly called the "private key". This alphanumeric string of the private key is the preferred form for displaying to users. Don't get confused by the difference between "secret key" and "private key" - there really isn't one, they are just different formats for the same information.
{% endhint %}

Using the method `fromSecretKey` which exists on the `Keypair` class from `@solana/web3.js`, it is possible to convert a `UInt8Array` secret key into a Keypair object with `publicKey` and `secretKey` properties. We'd still need to **base58 encode** the `secretKey` property to arrive at what is commonly called the "private key". A private key allows the holder to sign messages and transactions belonging to the public key. When you get your "private key" from the Phantom wallet for a given wallet, this is _approximately_ what is happening under the hood:

```typescript
// Modified example from components/protocols/pyth/lib/swap.ts

import {Keypair} from '@solana/web3.js';
import {bs58} from 'bs58';

const _account = Keypair.fromSecretKey(
  new Uint8Array([
    175, 193, 241, 226, 223, 32, 155, 13, 1, 120, 157, 36, 15, 39, 141, 146,
    197, 180, 138, 112, 167, 209, 70, 94, 103, 202, 166, 62, 81, 18, 143, 49,
    125, 253, 127, 53, 71, 38, 254, 214, 30, 170, 71, 69, 80, 46, 52, 76, 101,
    246, 34, 16, 96, 4, 164, 39, 220, 88, 184, 201, 138, 180, 181, 238,
  ]),
); // This is given for testing purposes only. Do NOT use this keypair in any production code.

// Logging the Keypair object, you'll notice that the publicKey is a 32-byte UInt8Array
// The secretKey is the entire 64-byte UInt8Array
// The first 32 bytes of the array are the secret key
// and the last 32 bytes of the array are the public key
console.log(_account);

// This returns the entire UInt8Array of 64 bytes
console.log(_account.secretKey);

// The secret key in base58 encoding:
// 4WoxErVFHZSaiTyDjUhqd6oWRL7gHZJd8ozvWWKZY9EZEtrqxCiD8CFvak7QRCYpuZHLU8FTGALB9y5yenx8rEq3
console.log(bs58.encode(_account.secretKey));

// The publicKey property is either a UInt8Array or a BigNumber:
// PublicKey { _bn: <BN: 7dfd7f354726fed61eaa4745502e344c65f622106004a427dc58b8c98ab4b5ee> }
console.log(_account.publicKey);

// The public key is commonly represented as a string when being used as an "address":
// 9UpA4MYkBw5MGfDm5oCB6hskMt6LdUZ8fUtapG6NioLH
console.log(_account.publicKey.toString());
```

It is not required, but you might want to test the **live wallet**, here are the steps to follow in the Phantom wallet to get your private key:

![Phantom Private Key Workflow](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/pyth/phantom_secret_key.png)

1. Click the hamburger menu at the top left
2. With the hamburger menu up, click on "Add / Connect Wallet"
3. Then click the option to "Create a new wallet"
4. View the newly created wallet's private key by clicking the gear icon on the bottom of the Phantom window
5. Scroll down inside Phantom and click on "Export Private Key"
6. You'll need to enter the password you've set up to unlock Phantom to reveal your private key
7. You'll now be able to copy and paste the private key into the wallet component on the right. Remember to keep your private keys private! 👻

![Phantom Settings](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/pyth/phantom_cluster.png)

---

# 🧱 Building the Wallet component

This component is necessary because we want to display the amount of SOL tokens & the amount of SPL tokens in our wallet (the USDC stablecoin is the SPL token we're referring to here). We'll also want to display the total value ("worth") of the combined amounts, based on the current market price. Keep in mind that the reason this amount is not being updated _on this page_ is because we haven't passed along the price. When we combine the components for the final step, the worth will update along with the token balances.

The final piece of the puzzle will be the percentage of change in the total worth of our wallet which will be used to indicate how our liquidation bot is performing. A positive percentage indicates a profit overall, and a negative percentage indicates a loss.

There are two files to be aware of, one is the React component [`components/protocols/pyth/components/Wallet.tsx`](https://github.com/figment-networks/learn-web3-dapp/main/components/protocols/pyth/components/Wallet.tsx) which is what is being displayed on the right side of this page. The other is a collection of helper code [`components/protocols/pyth/lib/wallet.tsx`](https://github.com/figment-networks/learn-web3-dapp/main/components/protocols/pyth/lib/wallet.tsx). The React component is responsible for displaying the account data, and uses the helper code to fetch and format the data. Let's go ahead and break down the helper code for easier understanding!

---

# 🚚 Importing dependencies

There are [imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) at the top of the component file (`/components/Wallet.tsx`) for the code libraries we'll use to make the Wallet component itself. Click on the name of an import in the lists below to visit the documentation if you'd like to learn more, but _feel free to scroll ahead_ if you're comfortable with the imports.

- [`antd`](https://ant.design/components/overview/) and [`@ant-design/icons`](https://ant.design/components/icon/) provide easy to use components for us to rapidly prototype our UI
- [`@pythnetwork/client`](https://github.com/pyth-network/pyth-client-js#pythnetworkclient) helps us to bring in Pyth data 🚀
- [`lodash`](https://lodash.com/docs/4.17.15) is a popular library which simplifies working with arrays, numbers, objects & strings
- [`rxjs`](https://rxjs.dev/guide/overview) is great for working with asynchronous events

We'll also need to import some other useful tools in the helper file (`/lib/wallet.tsx`) to make our component more flexible:

- [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) is used to connect to Solana clusters and simplifies making RPC calls
- [`axios`](https://axios-http.com/docs/intro) is a promise-based HTTP client which we can use to make requests
- [`bs58`](https://openbase.com/js/bs58/documentation) is a library for computing base 58 encoding, which is commonly used by cryptocurrencies
- [`lodash`](https://lodash.com/docs/4.17.15) is a popular library which simplifies working with arrays, numbers, objects & strings
- [`swr`](https://swr.vercel.app/) provides us with the `useSWR` hook, a powerful tool to fetch and cache data

We're going to use the [Jupiter](https://jup.ag) software development kit (SDK) in this project. As of this writing, Jupiter does not support Solana's devnet so for devnet swaps we'll use the Orca SDK. You'll see the imports in the file [`components/protocols/pyth/lib/swap.tsx`](https://github.com/figment-networks/learn-web3-dapp/main/components/protocols/pyth/lib/swap.tsx), which we will get to in the next step.

- [`@orca-so/sdk`](https://github.com/orca-so/typescript-sdk#orca-typescript-sdk) the Orca SDK enables us to create our `OrcaSwapClient`.
- [`@jup-ag/core`](https://docs.jup.ag/jupiter-core/using-jupiter-core#usage) the Jupiter SDK enables us to create our `JupiterSwapClient`.

---

# 💎 Interfaces and Constants

Next up, we need to define some important interfaces and constants:

- `WalletBalance` relates to our mock wallet implementation. This holds the balances we'll use in our **mock wallet**.
- An `Order` contains the necessary information to carry out a swap: If it is a buy or sell, the size of the swap, and the relevant tokens.
- We'll specify the Serum RPC endpoint as a constant so we can access it elsewhere. This is useful due to the increased rate limit for mainnet swaps.
- We also need to specify the [mint addresses](https://spl.solana.com/token#finding-all-token-accounts-for-a-specific-mint) of the tokens we want to swap. The mint addresses for USDC on devnet and mainnet are different.
- We're specifying the decimals using the `**` [exponentiation operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation), to ease our on the fly calculations 😅. Notice that we're `export`ing these so that they can be accessed by our other components. They'll pop up again further ahead in the Pathway, when we're displaying the order book.

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...

interface WalletBalance {
  sol_balance: number;
  usdc_balance: number;
  orca_balance: number;
}

interface Order {
  side: 'buy' | 'sell';
  size: number;
  fromToken: string;
  toToken: string;
}

export const SERUM_RPC_URL = 'https://solana-api.projectserum.com/';

const SOL_MINT_ADDRESS = 'So11111111111111111111111111111111111111112';
const DEVNET_USDC_MINT_ADDRESS = 'EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1';
const MAINNET_USDC_MINT_ADDRESS =
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const ORCA_MINT_ADDRESS = 'orcarKHSqC5CDDsGbho8GKvwExejWHxTqGzXgcewB9L';

export const SOL_DECIMAL = 10 ** 9;
export const USDC_DECIMAL = 10 ** 6;
export const ORCA_DECIMAL = 10 ** 6;
// ...
```

---

# 🪝 The useExtendedWallet hook

We're making a custom hook to handle our wallet interactions which we will call `useExtendedWallet`. Note that this hook combines the functionality for our mock wallet as well as using a **private key** for an existing keypair. You might expect to use a wallet adapter to tap into a browser extension wallet like Phantom. The frequency of swapping we'll be performing requires that we have an alternate, faster method to sign transactions. Nobody wants to sit in front of a computer clicking all day, do they? 😉

We'll start with the function signature for `useExtendedWallet`. Notice that we're passing a boolean value to determine which display to use (mock or live). We can also specify which Solana cluster to target, devnet or mainnet-beta. Price will default to zero as we still want to be able to use the hook before pulling in any price data from Pyth.

```typescript
// components/protocols/pyth/lib/wallet.tsx

export const useExtendedWallet = (
  useLive = false,
  cluster: Cluster,
  price: number = 0,
) => {
// ...
```

`setSecretKey` is using the browser's local storage to hold on to the private key entered into the textinput of the live wallet. `setKeyPair` works to help us generate the keypair from that input, otherwise it will generate a random keypair for the mock wallet by default. The `useState` hook lets us keep the keypair in our app state.

{% hint style="info" %}
It is a requirement of the Jupiter SDK that we provide a keypair to be able to fetch market data.
{% endhint %}

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const [secretKey, setSecretKey] = useLocalStorage('secretKey', undefined);
const [keyPair, setKeyPair] = useState<Keypair>(Keypair.generate());
// ...
```

You'll see that `setBalance` is for setting the balance in the app state based on our trades. We also supply default values so that we can reset the mock wallet.

```typescript
// components/protocols/pyth/lib/wallet.tsx

const [balance, setBalance] = useState<WalletBalance>({
  sol_balance: 10 * SOL_DECIMAL,
  usdc_balance: 1400 * USDC_DECIMAL,
  orca_balance: 0 * ORCA_DECIMAL, // ORCA token is only used on devnet.
});
// ...
```

The `orderBook` is maintained in our app state, and keeps track of the buy and sell orders within an array.

The `balanceFetcher` function is a straightforward axios POST request to the Solana cluster which passes the `getBalance` method for the keypair, which returns the SOL balance and `getTokenAccountsByOwner` for the SPL tokens we're using - USDC and ORCA. The `params` array for each request passes the base58 encoded public key and in the case of the SPL tokens, the mint address. The `jsonParsed` encoding is the best choice for displaying balances.

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const [orderBook, setOrderbook] = useState<Order[]>([]);

const balanceFetcher = (keyPair: Keypair, cluster: Cluster) => () =>
  // @ts-ignore
  axios({
    url: cluster === 'devnet' ? clusterApiUrl(cluster) : SERUM_RPC_URL,
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: [
      {
        jsonrpc: '2.0',
        id: 0,
        method: 'getBalance', // SOL balance.
        params: [keyPair?.publicKey.toBase58()],
      },
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner', // https://docs.solana.com/developing/clients/jsonrpc-api#gettokenaccountsbyowner
        params: [
          keyPair?.publicKey.toBase58(),
          {
            mint:
              cluster === 'devnet'
                ? DEVNET_USDC_MINT_ADDRESS
                : MAINNET_USDC_MINT_ADDRESS,
          },
          {
            encoding: 'jsonParsed',
          },
        ],
      },
      {
        jsonrpc: '2.0',
        id: 2,
        method: 'getTokenAccountsByOwner', // https://docs.solana.com/developing/clients/jsonrpc-api#gettokenaccountsbyowner
        params: [
          keyPair?.publicKey.toBase58(),
          {
            mint: ORCA_MINT_ADDRESS, // Required as a midway swap token for devnet swaps using Orca.
          },
          {
            encoding: 'jsonParsed',
          },
        ],
      },
    ],
  });
```

By [leveraging the `useSWR` hook](https://swr.vercel.app/) here, we can make sure that the amounts being displayed for the balance of our tokens on the frontend are accurate. The values are cached for us, and even on a slow connection they'll update reasonabl amount of time. We're also setting a refresh interval of five seconds.

Putting a call to `mutate` in a `useEffect` hook with a dependency of `cluster` means that any time we switch between devnet and mainnet, the balance will be handled by `useSWR`. Clean and simple code, keeps the kids happy 👍

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const {data, mutate} = useSWR(
  () => `/balance/${keyPair?.publicKey}`, // cache key based on the keypair.
  balanceFetcher(keyPair!, cluster),
  {
    refreshInterval: 5000,
  },
);

useEffect(() => {
  mutate(); // refresh balance
}, [cluster]);
// ...
```

Our next `useEffect` hook is using lodash to simplify drilling down into the `data` object's properties, which we then use to set our balances. The `data` object is destructured from `useSWR` and is populated by the `balanceFetcher` call.

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
useEffect(() => {
  if (data && useLive) {
    /**
     * Documentation for  _.get https://lodash.com/docs/4.17.15#get
     */
    const sol_balance = _.get(data, 'data[0].result.value', 0);
    const usdc_balance = _.get(
      data,
      'data[1].result.value[0]account.data.parsed.info.tokenAmount.amount',
      0,
    );
    const orca_balance = _.get(
      data,
      'data[2].result.value[0]account.data.parsed.info.tokenAmount.amount',
      0,
    );
    setBalance({sol_balance, usdc_balance, orca_balance});
  }
}, [data]);
// ...
```

Now we can define the "swap client" getters and setters. The main thing to notice here is that we're passing the RPC endpoint URL and parameters to a new `Connection` instance if there wasn't already an existing swap client in the app state.

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...

const [orcaSwapClient, setOrcaSwapClient] = useState<OrcaSwapClient | null>(
  null,
);

const getOrcaSwapClient = async () => {
  console.log('setting up Orca client');
  if (orcaSwapClient) return orcaSwapClient;
  const _orcaSwapClient = new OrcaSwapClient(
    keyPair,
    new Connection(clusterApiUrl('devnet'), 'singleGossip'),
  );
  setOrcaSwapClient(_orcaSwapClient);
  return _orcaSwapClient;
};

const [jupiterSwapClient, setJupiterSwapClient] =
  useState<JupiterSwapClient | null>(null);

const getJupiterSwapClient = async () => {
  console.log('setting up Jupiter client');
  if (jupiterSwapClient) return jupiterSwapClient;
  const _jupiterSwapClient = await JupiterSwapClient.initialize(
    // Why not use clusterApiUrl('mainnet') over projectserum? Because mainnet public endpoints have rate limits at the moment.
    new Connection(SERUM_RPC_URL, 'confirmed'),
    SOLANA_NETWORKS.MAINNET,
    keyPair,
    SOL_MINT_ADDRESS,
    MAINNET_USDC_MINT_ADDRESS,
  );
  setJupiterSwapClient((c) => _jupiterSwapClient);
  return _jupiterSwapClient;
};

// ...
```

When we're performing the swap transactions, we want to be able to differentiate between adding mainnet/devnet orders and adding a mock order to the order book. We've split it into separate functions. First, let's look at the `addMockOrder` function:

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const addMockOrder = async (order: Order): Promise<SwapResult> => {
  const timestamp = +new Date();
  const _jupiterSwapClient = await getJupiterSwapClient();
  const routes = await _jupiterSwapClient?.getRoutes({
    inputToken:
      order.side === 'buy'
        ? _jupiterSwapClient.tokenB // TokenB === USDC
        : _jupiterSwapClient.tokenA, // TokenA === SOL
    outputToken:
      order.side === 'buy'
        ? _jupiterSwapClient.tokenA
        : _jupiterSwapClient.tokenB,
    inputAmount: order.size,
    slippage: 1,
  });
  const bestRoute = routes?.routesInfos[0];
  const result = {
    timestamp,
    inAmount: bestRoute?.inAmount || 0,
    outAmount: bestRoute?.outAmount || 0,
    txIds: [
      `mockTransaction_${Math.abs(Math.random()).toString().slice(2, 8)}`,
    ],
  };

  // Balance change for the mock wallet. This is not an actual transaction.
  setBalance((previousBalance) => ({
    ...previousBalance,
    usdc_balance:
      order.side === 'buy'
        ? previousBalance.usdc_balance - result.inAmount
        : previousBalance.usdc_balance + result.outAmount,
    sol_balance:
      order.side === 'buy'
        ? previousBalance.sol_balance + result.outAmount
        : previousBalance.sol_balance - result.inAmount,
  }));

  return result;
};
// ...
```

This `devnetToMainnetPriceRatioRef` is necessary because the swap ratio from SOL to USDC on devnet is incorrect. It takes about 8 SOL to get 1 USDC 😓

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const [devnetToMainnetPriceRatioRef, setDevnetToMainnetPriceRatioRef] =
  useState<{
    sol_usdc: number;
    usdc_sol: number;
  }>({
    sol_usdc: 1,
    usdc_sol: 1,
  });
```

Most of what we're doing in `addDevnetOrder` and `addMainnetOrder` is simply conditional, depending on if we are handling buy or sell orders & which Solana cluster we're targeting. Using `switch` statements here also makes it quite simple to add in other tokens for swapping, if you feel so inclined 🤑 We won't go over the `addMainnetOrder` function here, but you can still see it in `wallet.tsx`.

Note that we're using try/catch here to capture errors and passing them in the return value. We'll explain more about this in the next step.

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const addDevnetOrder = async (order: Order) => {
  const timestamp = +new Date();
  try {
    const _orcaClient = await getOrcaSwapClient();
    if (order.side === 'buy') {
      switch (order.fromToken) {
        case 'ORCA': {
          const result = await _orcaClient?.buy_from_orca(order.size)!;
          return {
            ...result,
            timestamp,
          };
        }
        case 'USDC':
        default: {
          const result = await _orcaClient?.buy(order.size)!;
          const inAmountHumanReadable = result.inAmount / USDC_DECIMAL;
          const outAmountHumanReadable = result.outAmount / SOL_DECIMAL;
          setDevnetToMainnetPriceRatioRef((prev) => ({
            ...prev,
            usdc_sol: inAmountHumanReadable / outAmountHumanReadable,
          }));
          return {
            ...result,
            timestamp,
          };
        }
      }
    } else {
      switch (order.toToken) {
        case 'ORCA': {
          const result = await _orcaClient?.sell_to_orca(order.size)!;
          return {
            ...result,
            timestamp,
          };
        }
        case 'USDC':
        default: {
          const result = await _orcaClient?.sell(order.size)!;
          const inAmountHumanReadable = result.inAmount / SOL_DECIMAL;
          const outAmountHumanReadable = result.outAmount / USDC_DECIMAL;
          setDevnetToMainnetPriceRatioRef((prev) => ({
            ...prev,
            sol_usdc: inAmountHumanReadable / outAmountHumanReadable,
          }));
          return {
            ...result,
            timestamp,
          };
        }
      }
    }
  } catch (error) {
    return Promise.resolve({
      error,
      inAmount: 0,
      outAmount: 0,
      txIds: [],
      timestamp,
    });
  }
};
// ...
```

When we're resetting the mock wallet balance, we can calculate the floating point numbers to display on the fly using our predefined decimal constants. If we're resetting the balance when the live wallet is active, thanks to the `useSWR` hook we can just set the secret key to be an empty string which will trigger a refresh. We also want to update the current worth of the combined tokens.

```typescript
// components/protocols/pyth/lib/wallet.tsx

// ...
const resetWallet = (
  params = {sol_balance: 10, usdc_balance: 1400, orca_balance: 0},
) => {
  if (useLive) {
    setSecretKey('');
  } else {
    setBalance({
      sol_balance: params.sol_balance * SOL_DECIMAL,
      usdc_balance: params.usdc_balance * USDC_DECIMAL,
      orca_balance: params.orca_balance * ORCA_DECIMAL,
    });
    updateCurrentWorth(true);
  }
};
// ...
```

---

# 🏋️ Challenge

{% hint style="tip" %}
In `components/protocols/pyth/lib/wallet.tsx`, finish implementing the `useEffect` to set the keypair in the app state based on the user input of the `secretKey`. The `secretKey` is what is pasted into the text input of the **live wallet**. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
// components/protocols/pyth/lib/wallet.tsx
//...
const [keyPair, setKeyPair] = useState<Keypair>(Keypair.generate());
useEffect(() => {
  if (secretKey) {
    let arr = undefined;
    const key = undefined;
    // setKeyPair(key);
    // The line above must be uncommented for the page to work.
    // We have it commented by default because when the value of
    // key is undefined, the page will break when it loads.
  } else {
    // The mock uses a random keypair to be able to get real market data.
    const temp = Keypair.generate();
    setKeyPair(temp);
  }
}, [secretKey]);
//...
```

**Need some help?** Check out these links & hints 👇

- Check out the [Keypair class](https://solana-labs.github.io/solana-web3.js/classes/Keypair.html)
- Also read up on the [PublicKey](https://solana-labs.github.io/solana-web3.js/classes/PublicKey.html)
- Learn about [UInt8Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [bs58](https://github.com/cryptocoinjs/bs58#api) is very simple base58 library, it only has `encode` and `decode` methods
- You may notice `const [secretKey, setSecretKey] = useLocalStorage('secretKey', undefined);` which is where the key is saved to local storage, however the `undefined` value here is not part of the code challenge. The second parameter of `useLocalStorage` is an initial value, and we want it to be `undefined` 😃

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

# 😅 Solution

```typescript
// solution
// components/protocols/pyth/lib/wallet.tsx

//...
const [keyPair, setKeyPair] = useState<Keypair>(Keypair.generate());
useEffect(() => {
  if (secretKey) {
    let array = Uint8Array.from(bs58.decode(secretKey));
    const key = Keypair.fromSecretKey(array);
    setKeyPair(key);
    // The line above must be uncommented for the page to work.
    // We have it commented by default because when the value of
    // key is undefined, the page will break when it loads.
  } else {
    // The mock uses a random keypair to be able to get real market data.
    const temp = Keypair.generate();
    setKeyPair(temp);
  }
}, [secretKey]);
//...
```

**What happened in the code above?**

- We use a state variable called `keyPair` which defaults to generating a random keypair.
- If the variable `secretKey` is present, we are assuming that the user has pasted in a base58 encoded private key and create a `UInt8Array` by decoding that string with the bs58 `decode` method.
- We then pass the array to the `fromSecretKey` method of the `Keypair` class from `@solana/web3.js`.
- Finally, we set the state variable using `setKeyPair`.

# ✅ Make sure it works

Once you've completed the code in `components/protocols/pyth/lib/wallet.tsx` and saved the file, the Next.js development server will reload the page. Provided that you've correctly set the keypair into the app state by pasting it into the input on the **live wallet**, you will be able to proceed to the next step 🚀

---

# 🏁 Conclusion

We learned how to create a display for our account balances, with a little bit of extended functionality so that we can use it with the Solana mainnet. We also took a look at the specifics of Solana keypairs, and how to use Phantom to create a new account for testing.
