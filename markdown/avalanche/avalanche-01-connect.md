# A first contact

Ability to established a contact is the first step for anyone wanting to discoverd and travel through web3 space. Fasten your seat belt, it's time to take off.

------------------------

## Lesson

Connecting to a node work pretty much the same as for web server. You have two actors client/server and a protocol managing how data are transfered from one to another. 

The Main difference here rely on the protocol. We'll be using `json-rpc`: 
* `rpc`, it's just a way to call server-side function from client-side.
* `json`, do I need to explain this point ?

Need more => [avalancheGo APIs](https://docs.avax.network/build/avalanchego-apis)

------------------------

## Challenge

You are stuck on connect *room*, on the wall an unexpected old instruction is engraved:   
> Decode **pages/api/connect.ts** and the door will open.

```typescript
// fill the gap and be one of us :)
// Do not forget we'are in an async world.
  try {
    const client = undefined
    const info = undefined
    const version = undefined
    res.status(200).json(version)
  }
```

A footnote tell us to: 
* Use `getAvalanceClient` function
* Use `getNodeVersion` method of an unknow class.

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
* We instanciate an `Avalanche` object
* Calling `Info` method will set-up some high-level variable of our rpc-call
* `getNodeVersion` send the message and retrieve the answer.

------------------------

## Next

Well done you are now almost fluent in avalanche dialect. As a newcomer building an identity could be a great thing. Ready to make another step forward ?
