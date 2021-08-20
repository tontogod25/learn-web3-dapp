# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other. dsdsd

The main difference here is in the protocol. To connect to Avalanche, we'll be using `json-rpc`: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [AvalancheGo APIs](https://docs.avax.network/build/avalanchego-apis)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/avalanche/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with Avalanche & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
  try {
    const client = undefined
    const info = undefined
    const version = undefined
    res.status(200).json(version)
  }
```

A footnote engraved on the wall below the instructions reminds us to: 
* Use the `getAvalancheClient` helper function.
* Use the `Info` method on the client.
* Use the `getNodeVersion` method on the client info.

------------------------

## Solution

```typescript
  try {
    const client = getAvalancheClient()
    const info = client.Info()
    const version = await info.getNodeVersion()
    res.status(200).json(version)
  }
```

Quick overview:
* We instantiate an `Avalanche` object with `getAvalancheClient`.
* Calling the `Info` method returns a reference to the Info RPC.
* `getNodeVersion` sends the request and retrieves the answer.

------------------------

## Next

Well done! Your fluency in the Avalanche dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the Avalanche network. Ready to take the next step forward?
