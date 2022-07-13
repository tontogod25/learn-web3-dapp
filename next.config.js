const withTM = require('next-transpile-modules')([
  '@project-serum/sol-wallet-adapter',
  '@solana/wallet-adapter-base',
  // Uncomment wallets you want to use
  // "@solana/wallet-adapter-bitpie",
  // "@solana/wallet-adapter-coin98",
  // "@solana/wallet-adapter-ledger",
  // "@solana/wallet-adapter-mathwallet",
  '@solana/wallet-adapter-phantom',
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-solflare',
  '@solana/wallet-adapter-sollet',
  // "@solana/wallet-adapter-solong",
  // "@solana/wallet-adapter-torus",
  '@solana/wallet-adapter-wallets',
]);

module.exports = withTM({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack5: true,
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});
