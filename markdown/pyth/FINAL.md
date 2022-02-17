🥳 **Congratulations**, you have completed the Pyth Pathway! \
Here's a quick recap of what we covered:

- 🔌 Connecting to Pyth on Solana
- ⁉️ Subscribing to changes in Pyth's price data
- 🏦 Implementing a wallet display
- 📈 Visualizing market data on a chart
- 💸 Swapping tokens on a DEX
- ⛓ Implementing the liquidation bot

# 🧐 Keep learning with these resources:

- 🏗 [Pyth official documentation](https://docs.pyth.network/)
- 🚀 [Publishing data to Pyth](https://docs.pyth.network/publishers/getting-started)
- 🧱 [Implementing Moving Averages in JavaScript](https://blog.oliverjumpertz.dev/the-moving-average-simple-and-exponential-theory-math-and-implementation-in-javascript)

# 🪢 Mixing price feeds in Rust

Using the [Rust client library](https://github.com/pyth-network/pyth-client-rs#pyth-client), it is possible to merge two existing products that do not already have an associated pair. There are many reasons you might want to do this, and luckily the code to accomplish it within a Solana program is rather simple using the `get_price_in_quote()` function:

```rust
let btc_usd: Price = ...;
let eth_usd: Price = ...;
// -8 is the desired exponent for the result
let btc_eth: PriceConf = btc_usd.get_price_in_quote(&eth_usd, -8);
println!(BTC/ETH price: ({} +- {}) x 10^{}", price.price, price.conf, price.expo)
```

# 🗣 Give us your feedback

Please take a couple of minutes to fill out this short **[feedback form](https://docs.google.com/forms/d/1SXg3xo0I1BRN2BAS-ffDbj1P6bfwo0x48trttmJ5xKs/)**.
