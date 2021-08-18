# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other.

The main difference here is in the protocol. To connect to Tezos, we'll be using `json-rpc`: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [Tezos Toolkit](https://tezostaquito.io/)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/tezos/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with Tezos & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
  try {
    const url = getTezosUrl();
    const toolkit = new TezosToolkit(url);
    const chainId = await toolkit.rpc.getChainId();
    console.log(chainId, b58decode(chainId));
    if (validateChain(chainId) != 3) {
      throw Error("invalid chain Id");
    }
    res.status(200).json(chainId);
  } 
```

A footnote below the instruction reminds us to: 
* Use the `getTezosUrl` helper method to get a valid endpoint URL.
* Instantiate a new `TezosToolkit` using that `url`.
* Get the chainId via the toolkit RPC.

------------------------

## Solution

```typescript
  try {
    const url = getTezosUrl();
    const toolkit = new TezosToolkit(url);
    const chainId = await toolkit.rpc.getChainId();
    console.log(chainId, b58decode(chainId));
    if (validateChain(chainId) != 3) {
      throw Error("invalid chain Id");
    }
    res.status(200).json(chainId);
  } 
```

Quick overview:
* `getTezosUrl()` is a helper function to generate a valid endpoint URL.
* The `TezosToolkit` instance manages the connection.
* Tezos does not expose a software version for nodes, so we will instead retrieve the Chain ID with `getChainId()`.
------------------------

## Next

Well done! Your fluency in the Tezos dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the Tezos network. Ready to take the next step forward?
