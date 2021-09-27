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
    '^@solana/(.*)$': 'components/protocols/solana/$1',
    '^@polka/(.*)$': 'components/protocols/polka/$1',
    '^@near/(.*)$': 'components/protocols/near/$1',
    '^@ccelo/(.*)$': 'components/protocols/ccelo/$1',
    '^@tezos/(.*)$': 'components/protocols/tezos/$1',
    '^@secret/(.*)$': 'components/protocols/secret/$1',
    '^@avalanche/(.*)$': 'components/protocols/avalanche/$1',
    '^@polygon/(.*)$': 'components/protocols/polygon/$1',
  },
};
