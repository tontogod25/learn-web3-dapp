# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other.

The main difference here is in the protocol. To connect to Secret, we'll be using `json-rpc`: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [SecretJS Examples](https://github.com/enigmampc/SecretJS-Templates)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/secret/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with Secret & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
try {
    const url = undefined
    const client = undefined
    const nodeInfo = undefined
    const version = undefined
    res.status(200).json(version);
  }
```

A footnote below the instruction reminds us to: 
* Await the `getSafeUrl()` helper function.
* Instantiate a new `CosmWasmClient` using that `url`.
* Await the `nodeInfo()` on the client.
* Access the version property of `nodeInfo.application_version`

------------------------

## Solution

```typescript
try {
    const url = await getSafeUrl();
    const client = new CosmWasmClient(url);
    const nodeInfo = await client.restClient.nodeInfo();
    const version = nodeInfo.application_version.version;
    res.status(200).json(version);
  }
```

Quick overview:
* The `getSafeUrl()` helper function returns a valid endpoint URL.
* Instantiate a new `CosmWasmClient` from SecretJS with the endpoint URL.
* The `nodeInfo()` method gives us access to information about the node as well as the `application_version`.
------------------------

## Next

Well done! Your fluency in the Secret dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the Secret network. Ready to take the next step forward?
