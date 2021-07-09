# So who want to contribute ?

## Cloning the repository and setting up the dev-tools

Start by cloning the repository

People who have 2FA need to clone over ssh like so

```bash
git clone git@github.com:zurgl/learn-web3-dapp.git
```

For others, cloning over https is fine

```bash
git clone https://github.com/zurgl/learn-web3-dapp.git
```

Pick-up the latest lts version of nodejs

```bash
nvm use lts/fermium
```

Install the dependencies and start dev server

```bash
yarn install
yarn dev
```

## Start a new branch

Create a new branch

```bash
git branch new-figment-tutorial
```

Start to work on it

```bash
git checkout new-figment-tutorial
```
