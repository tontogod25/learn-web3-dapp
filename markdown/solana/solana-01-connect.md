# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other.

The main difference here is in the protocol. To connect to Solana, we'll be using `json-rpc`: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/solana/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with Solana & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
  try {
    const url = undefined
    const connection = undefined
    const version = undefined
    res.status(200).json(version?.["solana-core"]);
  } 
```

A footnote below the instruction reminds us to: 
* 

------------------------

## Solution

```typescript
  try {
    const url = getSolanaUrl(SOLANA_NETWORKS.DEVNET, SOLANA_PROTOCOLS.RPC);
    const connection = new Connection(url);
    const version = await connection.getVersion();
    res.status(200).json(version?.["solana-core"]);
  } 
```

Quick overview:
* 
------------------------

## Next

Well done! Your fluency in the Solana dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the Solana network. Ready to take the next step forward?
