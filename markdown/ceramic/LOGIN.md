In this tutorial we're going to replace the Connect with Metamask we just implemented with a Connect with IDX. But before we can dive in we need to understand few key terms when it comes to Ceramic and decentralized authentication....

# Steams

(Sorry we couldn't find an emoji for this one.)

`Stream` is a basic building block of Ceramic. It is a DAG-based data structure for storing continuous, mutable streams of content on IPFS.
Every stream is identified by immutable StreamID. When stream reaches node, a special function is fired to process it.
This function is called `SteamType`. StreamTypes are responsible for processing data and storing them as commits (which are individual IPFS records).
Every stream needs to specify StreamType so Ceramic nodes know how to process them. What is important in terms of authentication is the fact that every StreamTypes implementation is able to specify its own authentication mechanism.
For that purpose most StreamTypes are using DIDs.

# 🆔 You DID what?

DIDs is the W3C standard for decentralized identifiers which describes standard URI scheme for creating persistent decentralized identifier (DID). It also specifies how the metadata for given DID is resolved.
As with every standard there are several implementation of this standard called `DID methods`.
Every DID methods has a method specific URIs that looks like:

```
did:<method-name>:<method-specific-identifier>
```

There are over 40 different DID methods on the official DID registry.
Ceramic currently supports `3ID` and `Key` DID methods.
We will be using `3ID DID method` for the purpose of this tutorial as it is a powerful DID method that supports multiple keys, key rotations, and revocations.
`Key DID Method` on the other hand is tied only to a single crypto key which is not very convenient.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/ceramic/DID_standarad.png)

One of the other things that DID methods also describes is a location of where the metadata is stored. This metadata is stored in something that is called `DID document`.
`DID resolver` is a package which is responsible for returning DID document given the URI shown above.
One other missing piece is `DID provider` which is a package that exposes json-rpc interface which allows for the creation and usage of DID.
As an dApp creator you have a choice of using `3id-did-provider` package which is a low-level library. This method is not recommended as it leaves keys management to the application.
On the other had you could use `3ID Connect` which is a DID wallet that makes it easy to creat and use DID without worrying about keys management.
Below picture shows how applications can interact with DID resolvers and DID providers.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/ceramic/DID_usage.png)

That was a lot of important theory that we got out of our way. Now let's write some code.

# 📦 A few new packages

In order to be able to use IDX and 3ID Connect wallet you need to have the following packages installed:

- `@ceramicnetwork/http-client` - An http client for the ceramic network
- `@ceramicstudio/idx` - Javascript implementation of IDX protocol
- `dids` - Library for interacting with DIDs
- `@3id/connect` - 3ID account management service run in iframe.
- `@ceramicnetwork/3id-did-resolver` - DID method that uses the Ceramic network to resolve DID documents

Don't worry. We have you covered. These packages are already installed for you.

# THIS SECTION NEEDS A HEADING!

As you probably know authentication allows you to perform extra actions that are not allowed for regular users. In Ceramic when you are authenticated, you can perform such actions as updating data associated to your identity as well as creating genesis commits, signed commits, or decrypting data.

Connecting your Metamask wallet to dApp allows for easy interaction with smart contracts on a given blockchain ie. Ethereum. You can make transactions, query the network, all from the context of the account connected with Metamask. What if you could associate data like name, avatar, social accounts and also application-specific data to your account? In this challenge we will use Ceramic/IDX to log user in using 3ID Connect wallet.

For keeping information about authenticated user we use React Context API and wrap our application with exposed provider.

This allows us to keep the state of authenticated user in one place. You can see how it is implemented in `components/protocols/ceramic/context/idx.tsx`.

# 🧑🏼‍💻 Challenge

{% hint style="tip" %}
In `components/protocols/ceramic/context/idx.tsx`, implement the`login` function.
{% endhint %}

```typescript
// components/protocols/ceramic/context/idx.tsx

const logIn = useCallback(
  async (address: string): Promise<string | undefined> => {
    // Request authentication using 3IDConnect.
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#4-request-authentication

    // Create provider instance.
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#5-create-provider-instance

    // Create a DID instance.
    // Find more information here: https://developers.ceramic.network/build/javascript/http/
    // NOTE: We want to use only ThreeIdResolver here

    // Set DID instance on HTTP client
    // Find more information here: https://developers.ceramic.network/build/javascript/http/#7-set-did-instance-on-http-client

    // Set the provider to Ceramic
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#6-set-the-provider-to-ceramic

    // Authenticate the 3ID
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#7-authenticate-the-3id
    const userDID = undefined;

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }

    // Create IDX instance
    idxRef.current = new IDX({
      ceramic: ceramicRef.current,
      aliases,
    });

    return userDID;
  },
  [setIsAuthenticated],
);
```

**Need some help?** Check out these links

- [Learn how to use 3ID Connect DID wallet](https://developers.ceramic.network/authentication/3id-did/3id-connect/)
- [Setup HTTP Ceramic Client](https://developers.ceramic.network/build/javascript/http/)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 👉 Solution

```typescript
// solution
// components/protocols/ceramic/context/idx.tsx

const logIn = useCallback(
  async (address: string): Promise<string | undefined> => {
    // Request authentication using 3IDConnect.
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#4-request-authentication
    const threeIdConnect = new ThreeIdConnect();
    const authProvider = new EthereumAuthProvider(window.ethereum, address);
    await threeIdConnect.connect(authProvider);

    // Create provider instance.
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#5-create-provider-instance
    const provider = await threeIdConnect.getDidProvider();

    // Create a DID instance.
    // Find more information here: https://developers.ceramic.network/build/javascript/http/
    // NOTE: We want to use only ThreeIdResolver here
    const did = new DID({
      resolver: {
        ...ThreeIdResolver.getResolver(ceramicRef.current),
      },
    });

    // Set DID instance on HTTP client
    // Find more information here: https://developers.ceramic.network/build/javascript/http/#7-set-did-instance-on-http-client
    ceramicRef.current.did = did;

    // Set the provider to Ceramic
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#6-set-the-provider-to-ceramic
    ceramicRef.current.did.setProvider(provider);

    // Authenticate the 3ID
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#7-authenticate-the-3id
    const userDID = await ceramicRef.current.did.authenticate();

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }

    // Create IDX instance
    idxRef.current = new IDX({
      ceramic: ceramicRef.current,
      aliases,
    });

    return userDID;
  },
  [setIsAuthenticated],
);
```

# 🤔 What happened here?

First we create an instance of an Ethereum provider and tie it to a specific address that we receive after connecting our wallet to our website.

Then we make treeIdConnect to connect to this provider and once this is done we create a new instance of DID for which we provide provider and a resolver. Resolver is responsible for return DID document give the DID string and provider is responsible for providing a json-roc interface which allows for the creation and usage of a DID.

Then we set did instance to ceramic client.

Then we call authenticate which will start the authentication process. A popup will appear on the top right corrner which will prompt you for either create or update your existing identity. You will need to sign tx using Metamask and your DID should be associated with your Ethereum account now.
As a last step we create an IDX instance with authenticated ceramic client instance and any aliases that we want to use.
