# Setup the subgraph for CryptoPunks

Here we're going to explore how to write a dummy subgraph from an existing deployed contract on ethereum mainnet.

## Install the required software

We need to install the graph-cli tool at first:

```bash
npm install -g @graphprotocol/graph-cli
```

## Initialize the subgraph

We're going to run the following command to take care of the boilerplatte code.

```bash
graph init --allow-simple-name \
  --from-contract 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB \
  --index-events --contract-name punks --network mainnet \ 
  --node http://localhost:8020/ punks
```

Quick overview:
* `graph init` will initialize an empty subgraph
* `--allow-simple-name` option will simply the naming convention of our local graph
* `--from-contract` option allow us to select an already deployed contract
* `--index-event` option will create entity from event (not a good idea)
* `--contract-name punk` rename the contract punks
* `--network mainnet` tell to lookat mainnet ethereum to find the contract abi
* `--node http://localhost:8020/` will prepare our script to deploy to local node

Now we can go into the newly created folder, install dependencies and start hacking our subgraph.

```bash
cd punks
yarn
````

# Hacking the subgraphs.

## Hacking the manifest.

The manifest of a subgraph is the `subgraph.yaml` file, here we're going to simply it.

First, we're going to define only two entities

```yaml
entities:
  - Account
  - Punk
```

You can view entity as list of objects.

Next, we're listening only the `Assign` event and associate to it the `handleAssign` handler.

```yaml
eventHandlers:
  - event: Assign(indexed address,uint256)
    handler: handleAssign
```

To understand this we need to look at the solidity smart conract, you can find the source code [here](https://etherscan.io/address/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB#code):

```solidity
...

    event Assign(address indexed to, uint256 punkIndex);
...

    function getPunk(uint punkIndex) {
        if (!allPunksAssigned) throw;
        if (punksRemainingToAssign == 0) throw;
        if (punkIndexToAddress[punkIndex] != 0x0) throw;
        if (punkIndex >= 10000) throw;
        punkIndexToAddress[punkIndex] = msg.sender;
        balanceOf[msg.sender]++;
        punksRemainingToAssign--;
        Assign(msg.sender, punkIndex);
    }
```

Then anytimes a user get a punk the event is emitted.
Then anytimes the event is emitted we're calling the handleAssign of our subgraph to process the info.
Processing the info mean building our entities (Punk and Account) using the current block transaction.

## Hacking the GraphQL Schema

Here we're going to define our enities just copy and paste the following into `schema.graphql`

```graphql
type Account @entity {
  id: ID!
  punksOwned: [Punk!] @derivedFrom(field: "owner")
  numberOfPunksOwned: BigInt!
  LastMvtAt: BigInt
}

type Punk @entity {
  id: ID!
  tokenId: BigInt!
  owner: Account!
  LastAssignAt: BigInt
}
```

## Hacking the mapping

Here we're going to precisely define how we create entities from block information emitting Assign event.
But before, we need to generate some code using the following command.

```bash
yarn codegen
```

Now, open `src/mapping.ts` and create the `handleAssign` function
First we need a bunch of import and the prototype of the function

```typescript
import {BigInt} from '@graphprotocol/graph-ts';

import {Assign as AssignEvent} from '../generated/punks/punks';
import {Account, Punk} from '../generated/schema';

// event Assign(address indexed to, uint256 punkIndex);
export function handleAssign(event: AssignEvent): void {
  // fill here
}
```

You can deduced than Account and Punk imported object are the same than the one we've just defined into `schema.graphql` and `AssignEvent` is referencing the definition of event we gave on `subgraph.yaml`

Now, time to create the Account entity

First, we test if the entity have already been created.

```typescript
  let account = Account.load(event.params.to.toHexString());
```

if not we create a new one filling all the field

```typescript
  if (account == null) {
    account = new Account(event.params.to.toHexString());
    account.id = event.params.to.toHexString();
    account.numberOfPunksOwned = BigInt.fromI32(1);
  }
```

otherwise, we only need to increment the number of owned punk

```typescript
  else {
    account.numberOfPunksOwned ==
      account.numberOfPunksOwned.plus(BigInt.fromI32(1));
  }
```

At last and for both case we update the timestamp

```typescript
  account.LastMvtAt = event.block.timestamp;
  account.save();
```

The creation of Punk entity follow the same logic.

# Deploying the contract on a local node

## Setup the localnode

A docker-compose file is already setup for you, we won't detail it, just keep in mind to acquire an API key from alchemy service and run the following command:

```bash
sudo ETHEREUM_RPC=mainnet:https://eth-mainnet.alchemyapi.io/v2/<API-KEY> docker-compose up
```

## Building and deploying our subgraph

Issue the command in this order

```bash
yarn create-local
yarn deploy-local
```

After deploying the subgraph two urls are displayed copy the first one and paste it in `.env.local` at **NEXT_PUBLIC_URL_GRAPH**

It should be

```
http://localhost:8000/subgraphs/name/punks
```

Now, just take your time, creating the subgraph can take 2 hours.

# Interacting with the graph

Start the pathway application, select **THE GRAPH** and start the pathway =)

Enjoy
