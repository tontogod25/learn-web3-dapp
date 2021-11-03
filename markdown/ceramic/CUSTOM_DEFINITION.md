# 📋 Creating definitions

Now we know how to store and retrieve data from BasicProfile, which is a definition already provided by IDX. But what if we want to store data that is specific to our application for each user identified by DID? For this reason, let’s assume that we are building an application that stores the favourite quote of a user. How can we do it?

## 💻 IDX CLI

When you create a custom definition, you have to use IDX CLI. To install it run:

```text
npm install --global @ceramicstudio/idx-cli
```

We also recommend installing Ceramic CLI.

```text
npm install --global @ceramicnetwork/cli
```

Read more about IDX CLI [here](https://developers.idx.xyz/guides/cli/).

Once the IDX and Ceramic CLI are installed, you can configure the IDX CLI to use a specific testnet node. The Ceramic testnet is called Clay. Use the command:

```
idx config:set ceramic-url https://ceramic-clay.3boxlabs.com
```

Once this is done, you can create your new DID:

```text
idx did:create --label=figment
```

Here you have an option to provide a label to make later requests easier. Instead of remembering your DID and typing it every time, you will be able to use that label for subsequent requests.

You can check your newly created DID by running:

```text
idx did:list
```

**Why can't we use DID from previous steps?**

Don't know yet.

Ok, now we are ready to create our custom definition! For this purpose, we will use the schema outlined below, which describes a simple structure of a favourite quote with 2 string fields: `text` and `author`.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "FigmentLearn",
  "description": "Web3 learning with Figment Learn",
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "maxLength": 300
    },
    "author": {
      "type": "string",
      "maxLength": 150
    }
  }
}
```

We need to publish our schema to Ceramic first. In order to do that we use:

```text
idx schema:publish figment '{ "$schema": "http://json-schema.org/draft-07/schema", "title": "FigmentLearn", "description": "Web3 learning with Figment Learn", "type": "object", "properties": { "text": { "type": "string", "maxLength": 300 }, "author": { "type": "string", "maxLength": 150 } } }'
```

This should return the URI which looks similar to `ceramic://k3y52l7qbv1fryo5num99f2umi34cae2yn13wyo4hs3o0d4jai1hq1owg1ep04w74`. We can take that URI and use it to create our custom definition:

```text
idx definition:create figment --schema='ceramic://k3y52l7qbv1fryo5num99f2umi34cae2yn13wyo4hs3o0d4jai1hq1owg1ep04w74' --name='Favourite quote' --description='What is your favourite quite?'
```

In the above step, besides schema URI we also provide name and description of our custom definition. This will return StreamID for our definition that looks something similar to: `kjzl6cwe1jw146qq6gh9j04b43jycgypjs8v5gqhtnurtym0q1nma0vr3vd6px3`

Now we can create an alias for that definition’s StreamID the same way we used the BasicProfile alias in step #3.

Go to `components/protocols/ceramic/lib.index.ts` and paste above StreamID to `figment` alias. It should look like:

```js
export const aliases = {
  figment: 'kjzl6cwe1jw146qq6gh9j04b43jycgypjs8v5gqhtnurtym0q1nma0vr3vd6px3',
};
```

Once you have your alias set up, you need to load it to IDX. You can do that by clicking the **Set alias** button on the top right corner of the **Challenge #1** card.

Now we are all set to write and read data from our custom definition.

# 🏋️ Challenge #1

Write quote to Ceramic.

{% hint style="tip" %}
In `components/protocols/ceramic/components/steps/CustomDefinition.tsx`, implement the `saveQuote` function.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
const saveQuote = async (values: QuoteSchemaT) => {
  setSaving(true);
  const {text, author} = values;

  setAlias();

  try {
    // Save quote information to custom schema (use IdxSchema.Figment enum)

    setMyQuote({
      text,
      author,
    });
  } catch (error) {
    alert(error.message);
  } finally {
    setSaving(false);
  }
};
```

**Need some help?** Check out these links 👇

- [Create records using IDX](https://developers.idx.xyz/build/writing/)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution to Challenge #1

```typescript
// solution
const saveQuote = async (values: QuoteSchemaT) => {
  setSaving(true);
  const {text, author} = values;

  setAlias();

  try {
    // Save quote information to custom schema (use IdxSchema.Figment enum)
    await idx.set(IdxSchema.Figment, {text, author});

    setMyQuote({
      text,
      author,
    });
  } catch (error) {
    alert(error.message);
  } finally {
    setSaving(false);
  }
};
```

**What happened in the code above?**

- Here we use the familiar `set` method, but instead of passing `basicProfile` as the first parameter we pass the alias to our custom definition `figment` and as a second parameter we pass the data defined in our custom JSON schema (`text` and `author`).

# 🏋️ Challenge #2

Now we can test if the data about our favourite quote indeed got stored to Ceramic.

{% hint style="tip" %}
In `components/protocols/ceramic/components/steps/BasicProfile.tsx`, implement the `readQuote` function.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
const readQuote = async () => {
  try {
    setFetching(true);

    // Read quote (use IdxSchema.Figment enum)
    const resp = undefined;

    setCustomDefinitionData(resp);
  } catch (error) {
    alert(error.message);
  } finally {
    setFetching(false);
  }
};
```

**Need some help?** Check out these links 👇

- [Read records using IDX](https://developers.idx.xyz/build/reading/)

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution for Challenge #2

```typescript
// solution
const readQuote = async () => {
  try {
    setFetching(true);

    // Read quote (use IdxSchema.Figment enum)
    const resp = await idx.get<QuoteSchemaT>(IdxSchema.Figment);

    setCustomDefinitionData(resp);
  } catch (error) {
    alert(error.message);
  } finally {
    setFetching(false);
  }
};
```

**What happened in the code above?**

- Here we use the familiar `get` method, providing our custom alias to retrieve data about our favourite quote.
