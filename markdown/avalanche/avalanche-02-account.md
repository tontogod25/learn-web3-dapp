# Take your keys

Whitout identity how could you expect to interact with any others entities populating the Avalanche Moutains ? 

------------------------

## Lesson

Conceptually an identity in web3 space is a keypair: 
* A private one, only know by you. This is your ADN, a proof of your existence. One holding this key, will be a perfect clone of you. 
* A public one, available to anyone. This is your current location in space. Anyone knowing the key can etablish a communication with you.

I like to make the following mapping:
If a public key is a 

------------------------

## Challenge

You are stuck on account *room*, crypto-punk police officer ask your identity:   
> Decode **pages/api/connect.ts** and you'll be released.

```typescript
// fill the gap an identity :)
	const client = getAvalancheClient()
	const chain = client.XChain(); 
	const keyChain = undefined 
	const key = undefined
```

A footnote tell us to: 
* Use `getAvalanceClient` function
* Use `getNodeVersion` method of an unknow class.

------------------------

## Solution

```typescript
	const client = getAvalancheClient()
	const chain = client.XChain(); 
	const keyChain = chain.keyChain(); 
	const key = keyChain.makeKey()
```

Quick overview:
* We instanciate an `Avalanche`object
* Calling `Info` method will set-up some high-level variable of our rpc-call
* `getNodeVersion` send the message and retrieve the answer.

------------------------

## Next


