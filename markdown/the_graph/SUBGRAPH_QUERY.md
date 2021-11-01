## 🕵🏻 Querying the subgraph

After deploying the subgraph, we need to wait a little in order for it to sync with the Ethereum mainnet. It will scan past blocks to find events and then listen to any new events

We can follow the progression of the sync looking at the logged output by the running docker instance of our local graph node.

<<<<<<< Updated upstream

> Before, running the query you'll need to check you have a [metamask](https://metamask.io/) extension installed with your browser and you're connected to the mainnet of Ethereum. Why? We'll decorate the date returned by the GraphQL query with data coming from the [CryptoPunks Data](https://etherscan.io/address/0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2#readContract) to be able to render the images and other punk metadata.

# Our Graph node come up with a GraphQL endpoint, available at [http://localhost:8000/subgraphs/name/punks](http://localhost:8000/subgraphs/name/punks/graphql). Open this in another tab and you will see a GraphiQL UI. Consider this a sandboz in which to experiment with queries. Open the right sidebar to explore your schema.

> Before, running the query you'll need to check you have a [metamask](https://metamask.io/) extension installed with your browser and you're connected to the mainnet of Ethereum. Why? We'll decorate the data returned by the GraphQL query with data coming from the [CryptoPunks Data](https://etherscan.io/address/0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2#readContract) to be able to render the images and other punk metadata.

Our Graph node comes with a GraphQL endpoint, available at [http://localhost:8000/subgraphs/name/punks](http://localhost:8000/subgraphs/name/punks/graphql). Open this in another tab and you will see a GraphiQL UI. Consider this a sandbox in which to experiment with queries. Open the right sidebar to explore your schema.

If you're running the Pathway using Gitpod, you will need to add the Gitpod Workspace URL to `.env.local` instead of localhost. The port number must also be added to the beginning of the URL, rather than at the end. For example: `https://8000-olive-meerkat-mapxxnyp.ws-us18.gitpod.io/`.

> > > > > > > Stashed changes

## 👨‍💻 Your turn! Write the GraphQL query

In `components/protocols/the_graph/graphql/index.ts`, write a GraphQL query to return the 10 most expensive CryptoPunks.

Some hints to help you:

- Start by just fetching for punks and passing all the fields you want back
- You will want `id`, `index`, `value` and `date`
- Then use `first`, `orderBy` and `orderDirection` to get 10 of highest value

<<<<<<< Updated upstream
Remember to use **GraphiQL IDE** at [http://localhost:8000/subgraphs/name/punks](http://localhost:8000/subgraphs/name/punks) to play around
=======
Remember to use **GraphiQL IDE** at [http://localhost:8000/subgraphs/name/punks](http://localhost:8000/subgraphs/name/punks) (or at your Gitpod URL) to play around

> > > > > > > Stashed changes

## 😅 Solution

In `components/protocols/the_graph/graphql/index.ts` replace the GraphQL query with:

```graphql
// solution
query {
  punks(first: 10, orderBy: value, orderDirection: desc) {
    id
    index
    owner {
      id
    }
    value
    date
  }
}
```

## 🥳 Enjoy the result of your work

Now, it's time to enjoy the result of your work! Click on the button on the right, and say hello to the Punks!

![punks](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/the-graph/query-01.png)

## 🏁 Conclusion

Nice, you made it! What did you think?

<<<<<<< Updated upstream
If you have any feedback, reach out on [Discord](https://discord.com/invite/fszyM7K)!
=======
If you have any feedback, reach out on [Discord](https://figment.io/devchat)!

> > > > > > > Stashed changes

If you want to keep learning about The Graph, we have more advanced tutorial on [Figment Learn](https://learn.figment.io/protocols/thegraph).
