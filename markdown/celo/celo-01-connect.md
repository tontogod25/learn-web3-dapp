# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other.

The main difference here is in the protocol. To connect to Celo, we'll be using `json-rpc`: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [Celo ContractKit](https://docs.celo.org/developer-guide/contractkit)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/celo/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with Celo & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
  try {
    const url = undefined
    const kit = undefined
    const version = undefined
    res.status(200).json(version)
  }
```

A footnote below the instructions reminds us to: 
* Use the `getSafeUrl` helper function to get a valid RPC endpoint.
* Use the `newKit` function to connect, passing the `url`.
* Await the `kit.web3.eth.getNodeInfo` method on the kit instance to query the node software version.

------------------------

## Solution

```typescript
  try {
    const url = getSafeUrl();
    const kit = newKit(url);
    const version = await kit.web3.eth.getNodeInfo();
    res.status(200).json(version)
  }
```

Quick overview:
* Use the `getSafeUrl` helper function to return an endpoint URL to connect with.
* Instantiate a new `ContractKit` object, passing the endpoint URL from `getSafeUrl` as a function argument.
* `web3.eth.getNodeInfo` returns the software version the Celo node is running.

------------------------

## Next

Well done! Your fluency in the Celo dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the Celo network. Ready to take the next step forward?
