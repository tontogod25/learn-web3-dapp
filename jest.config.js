module.exports = {
  testPathIgnorePatterns: ['./node_modules/', './.next/'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^@figment-avalanche/(.*)$': 'components/protocols/avalanche/$1',
    '^@figment-celo/(.*)$': 'components/protocols/celo/$1',
    '^@figment-ceramic/(.*)$': 'components/protocols/ceramic/$1',
    '^@figment-near/(.*)$': 'components/protocols/near/$1',
    '^@figment-polkadot/(.*)$': 'components/protocols/polka/$1',
    '^@figment-polygon/(.*)$': 'components/protocols/polygon/$1',
    '^@figment-pyth/(.*)$': 'components/protocols/pyth/$1',
    '^@figment-secret/(.*)$': 'components/protocols/secret/$1',
    '^@figment-solana/(.*)$': 'components/protocols/solana/$1',
    '^@figment-tezos/(.*)$': 'components/protocols/tezos/$1',
    '^@figment-thegraph/(.*)$': 'components/protocols/the_graph/$1',
  },
};
