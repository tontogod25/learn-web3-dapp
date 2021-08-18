# Take your keys

Whitout identity how could you expect to interact with any others entities populating the web3 space ? 

------------------------

## Lesson

Conceptually an identity in web3 space is a keypair: 
* A private one, only know by you. This is your ADN, a proof of your existence. One holding this key, will be a perfect clone of you. 
* A public one, available to anyone. This is your current location in space. Anyone knowing the key can etablish a communication with you.

I like to make the following mapping:
If a public key is your mobile phone number then your private key is your sim card

Here you learn how pratically set up a keypair.

------------------------

## Challenge

A crypto-punk police's officer ask for your identity:   
> Decode **pages/api/account.ts** and you'll be released.

```typescript
// fill the gap to obtain your identity :)
	const client = getAvalancheClient()
	const chain = client.XChain(); 
	const keyChain = chain.keyChain(); 
	const keypair = keyChain..... //
	const secret = undefined
	const address = undefined
	res.status(200).json({
		secret, address
	})
```

Some hints : 
* Using code completion feature of your favorite code editor find a method which retrieve a KeyPair object
* On keypair instance call the good method to retrieve the `PrivateKey` in string format
* On keypair instance call the good method to retrieve the `Address` in string format

------------------------

## Solution

```typescript
	const client = getAvalancheClient()
	const chain = client.XChain(); 
	const keyChain = chain.keyChain(); 
	const keypair = keyChain.makeKey()
	const secret = keypair.getPrivateKeyString()
	const address = keypair.getAddressString()
	res.status(200).json({
		secret, address
	})
```

Quick overview:
* Calling `makeKey` method will give us a keypair
* `getPrivateKeyString` retrieve the string formated private key
* `getAddressString` retrieve the string formated public key

------------------------

## Next

Nice now, you hold an identity it's time to interact, don't forget to go on a faucet to earn some token.
You want to know the amount of token you hold ? Good, this is exactly what the next challenge is asking for. 
