# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other.

The main difference here is in the protocol. To connect to Polkadot, we'll be using `json-rpc`, with a JavaScript wrapper to make all calls [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) based: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [Polkadot ApiPromise](https://polkadot.js.org/docs/api/examples/promise/simple-connect)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/polkadot/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with Polkadot & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
 try {
    const url = undefined
    const provider = undefined
    const api = undefined
    const rawVersion = undefined
    const version = undefined
    res.status(200).json(version);
  }
```

A footnote below the instruction reminds us to: 
* Use the `getSafeUrl` helper function.
* Instantiate a new Provider object using that `url`.
* Create the connection by passing the provider to `ApiPromise.create` as an object.
* Await the system version of the API.
* Convert the raw version to a readable string.

------------------------

## Solution

```typescript
 try {
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const rawVersion = await api.rpc.system.version();
    const version = rawVersion.toHuman();
    res.status(200).json(version);
  }
```

Quick overview:
* The `getSafeUrl()` helper function returns a valid endpoint URL.
* In this context, a [provider](https://polkadot.js.org/docs/api/start/create/#providers) is referring to the *type* of connection. The [WebSocket](https://en.wikipedia.org/wiki/WebSocket) provider is the officially supported type on Polygon.
* `ApiPromise.create()` returns a Promise containing the actual API instance.
* `api.rpc.system.version()` queries the version from the node.
* Then the method `toHuman()` can be used to make the version string reader friendly.
------------------------

## Next

Well done! Your fluency in the Polkadot dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the Polkadot network. Ready to take the next step forward?
