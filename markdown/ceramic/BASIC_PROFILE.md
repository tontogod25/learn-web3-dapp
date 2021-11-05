# How to use IDX?

Now that we have our DID and we know how to authenticate using 3ID Connect, we can look into how to associate data to our DID.
But first let’s talk about what is happening under the hood of IDX.

![](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/ceramic/idx.png)

Every DID has an index which is a map of `DefinitionID` and `RecordID`.
Record defined by RecordID is the data that you want to store.
But how IDX knows about the format of the data?
That’s where Schema comes in. Schema is a JSON schema that describes the format of the data. This schema then is provided to a `Definition` which holds reference to schema's SteamID as well as name and description of that definition.
So if you want to submit a Record for a particular definition you need to send data that conforms to that schema.
If you want to store something to IDX that is associated to your DID you need to know DefinitionID which tells IDX what data will come in and you need to provide Record with an actual data.
If the data that you are trying to submit does not conform to schema, your request will fail.
Since DefinitionID is just a StreamID which is not very friendly to human eye, IDX has a concept of `aliases` which are just human readable names for Definitions identified by DefinitionIDs.
One of the default definitions provided by IDX is called `BasicProfile`. It is definition used to hold basic profile information like name, description, avatar etc.
Below is the schema describing BasicProfile definition. All schemas must comply with JSON schema draft 07.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BasicProfile",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "maxLength": 150
    },
    "image": {
      "$ref": "#/definitions/imageSources"
    },
    "description": {
      "type": "string",
      "maxLength": 420
    },
    "emoji": {
      "type": "string",
      "maxLength": 2
    },
    "background": {
      "$ref": "#/definitions/imageSources"
    },
    "birthDate": {
      "type": "string",
      "format": "date",
      "maxLength": 10
    },
    "url": {
      "type": "string",
      "maxLength": 240
    },
    "gender": {
      "type": "string",
      "maxLength": 42
    },
    "homeLocation": {
      "type": "string",
      "maxLength": 140
    },
    "residenceCountry": {
      "type": "string",
      "pattern": "^[A-Z]{2}$",
      "maxLength": 2
    },
    "nationalities": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string",
        "pattern": "^[A-Z]{2}$",
        "maxItems": 5
      }
    },
    "affiliations": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 140
      }
    }
  },
  "definitions": {
    "IPFSUrl": {
      "type": "string",
      "pattern": "^ipfs://.+",
      "maxLength": 150
    },
    "positiveInteger": {
      "type": "integer",
      "minimum": 1
    },
    "imageMetadata": {
      "type": "object",
      "properties": {
        "src": {
          "$ref": "#/definitions/IPFSUrl"
        },
        "mimeType": {
          "type": "string",
          "maxLength": 50
        },
        "width": {
          "$ref": "#/definitions/positiveInteger"
        },
        "height": {
          "$ref": "#/definitions/positiveInteger"
        },
        "size": {
          "$ref": "#/definitions/positiveInteger"
        }
      },
      "required": ["src", "mimeType", "width", "height"]
    },
    "imageSources": {
      "type": "object",
      "properties": {
        "original": {
          "$ref": "#/definitions/imageMetadata"
        },
        "alternatives": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/imageMetadata"
          }
        }
      },
      "required": ["original"]
    }
  }
}
```

# 🏋️ Challenge #1

In this tutorial, we will learn how to write data to the BasicProfile and then read it.

{% hint style="tip" %}
In `components/protocols/ceramic/components/steps/BasicProfile.tsx`, implement the `saveBasicProfile` function.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
const saveBasicProfile = async (values: BasicProfile) => {
  setSaving(true);
  setBasicProfile(null);

  const {name} = values;

  try {
    // Set BasicProfile (use IdxSchema.BasicProfile)
    setCurrentUserData(undefined);
    setName(name);
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

# 😅 Solution for Challenge #1

```typescript
// solution
const saveBasicProfile = async (values: BasicProfile) => {
  setSaving(true);
  setBasicProfile(null);

  const {name} = values;

  try {
    // Set BasicProfile (use IdxSchema.BasicProfile)
    setCurrentUserData(IdxSchema.BasicProfile, {name});
    setName(name);
  } catch (error) {
    alert(error.message);
  } finally {
    setSaving(false);
  }
};
```

**What happened in the code above?**

- Destructure the `name` property from the BasicProfile values passed to the `saveBasicProfile` function.
- Use the `setCurrentUserData` React hook to set the BasicProfile and associate it with the `name` object.
- Use the `setName` React hook to set the BasicProfile's `name` so it can be displayed in the UI.

# 🏋️ Challenge #2

Now that we have our data stored with IDX, it's time to read it in order to validate if what we stored in Challenge #1 worked.

{% hint style="tip" %}
In `components/protocols/ceramic/components/steps/BasicProfile.tsx`, implement the `readBasicProfile` function.
{% endhint %}

**Take a few minutes to figure this out.**

```typescript
const readBasicProfile = async () => {
  try {
    setFetching(true);
    // Read BasicProfile (use IdxSchema.BasicProfile enum)
    const resp = undefined;
    setCurrentUserData(IdxSchema.BasicProfile, resp as BasicProfile);
    setBasicProfile(resp);
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
const readBasicProfile = async () => {
  try {
    setFetching(true);

    // Read BasicProfile (use IdxSchema.BasicProfile enum)
    const resp = await idx.get<BasicProfile>(IdxSchema.BasicProfile);
    setCurrentUserData(IdxSchema.BasicProfile, resp as BasicProfile);
    setBasicProfile(resp);
  } catch (error) {
    alert(error.message);
  } finally {
    setFetching(false);
  }
};
```

**What happened in the code above?**

- Here we use idx instance to call `get` method on it providing just `basicProfile` as an argument. Since we are authenticated ceramic client is aware of our DID so we do not have to pass it in. However, we can ready basicProfile data about any DID since this data is public. In order to read basicProfile for DID that is not ours we have to explicitly pass that DID as a second parameter.
