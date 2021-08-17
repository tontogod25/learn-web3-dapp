# A first contact

The ability to establish a connection is the first step for anyone wanting to discover and travel through web3 space. Fasten your seat belt, it's time to take off 🚀!

------------------------

## Lesson

Connecting to a node works pretty much the same as for a standard web server. There are two actors: Client & server, with a protocol managing how data are transferred from one to the other.

The main difference here is in the protocol. To connect to NEAR, we'll be using `json-rpc`: 
* `json`, stands for **J**ava**S**cript **O**bject **N**otation, which is a [text format for transferring data](https://www.w3schools.com/js/js_json_intro.asp).
* `rpc`, stands for **R**emote **P**rocedure **C**all - a way to [call a server-side function](https://en.wikipedia.org/wiki/Remote_procedure_call) from the client-side.


Need more info? => [NEAR ContractKit](https://docs.NEAR.org/developer-guide/contractkit)

------------------------

## Challenge

You are stuck in the web2.0 waiting room and need to *connect* to the web3 world. On the wall, an instruction is engraved:   
> Decode **pages/api/near/connect.ts** and the door will open!

```typescript
// Fill in the gaps to connect with NEAR & be one of us :)
// Do not forget we're in an "async" world,
// so you may need to "await" some results.
 try {
    const config = undefined
    const client = undefined
    const providerStatus = undefined
    const version = undefined
    return res.status(200).json(version);
  }
```

A footnote below the instructions reminds us to: 
* Pass the `networkId` from the request body to the `configFromNetworkId` helper function.
* Await the `nearConnect` method, passing it the config object.
* Check the provider status on the client instance.
* Get the version property from the `Version` object returned by the `status` method.

------------------------

## Solution

```typescript
 try {
    const config = configFromNetworkId(networkId);
    const client = await nearConnect(config);
    const providerStatus = await client.connection.provider.status();
    const version = providerStatus.version.version;
    return res.status(200).json(version);
  }
```

Quick overview:
* `configFromNetworkId()` takes the network identifier such as 'mainnet' or 'testnet' and returns a `config` object containing the correct URLs.
* `nearConnect()` takes the `config` object and returns an instance of `Near`, which has the connection details.
* `client.connection.provider.status()` returns a `NodeStatusResult` which contains information about the node such as its ChainID, RPC address and software version.
* Drilling down to the `version` property of the `Version` interface contained in the `NodeStatusResult` yields the NEAR version string.

------------------------

## Next

Well done! Your fluency in the NEAR dialect of web3 is growing. As a newcomer, building an identity is important so you can distinguish yourself from other users on the NEAR network. Ready to take the next step forward?
