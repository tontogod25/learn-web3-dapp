## 🤔 What's The Graph?

You might have already read about The Graph and just want to roll up your sleeves and get started with coding, in which case feel free to skip to the "Setup the project" section below

If you want to read about The Graph we've curated some great resources to help you get started:

- We wrote [this Twitter thread](https://twitter.com/sprngtheory/status/1425137466789486592) to explain The Graph without technical jargon. It's a great place to start!
- Projects' own documentation are not always the best place to start, however The Graph is an exception. They have very well written and approachable docs. [Give them a read](https://thegraph.com/docs/about/introduction).
- More of a visual learner? The rock star of blockchain Youtube - Finematics - have the perfect video for you: [Binge it here](https://www.youtube.com/watch?v=7gC7xJ_98r8).
- You're still here?? We have curated more links on [Figment Learn](https://learn.figment.io/protocols/thegraph). Knock yourself out!

## 🐳 Docker

In this pathway you'll use Docker to easily run a local Graph node on your machine. [You can install Docker here](https://www.docker.com). Make sure it's installed and running before going forward.

## 🔑 Get an Alchemy API key

We'll need to connect to the Ethereum mainnet to be able to listen to new events happening on the network. Alchemy is a blockchain development platform that provides access to Ethereum through their hosted nodes.

To get an Alchemy API key, [create an account](https://www.alchemy.com/), then create a new application. From that application dashboard, click on **View Details** and then on **View Key**. Copy the HTTP endpoint URL.

![Alchemy](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/the-graph/alchemy-view-api-key.png)

## 🎥 Video Walkthrough

This is a video walkthrough of the Pathway which goes into detail to help you understand what is going on at every step.
The beginning of the video is a discussion of Web 3 between Guillaume Galuz, Figment's Head of Education and Nader Dabit, Developer Relations Engineer at Edge & Node. The walkthrough of the Pathway content begins at [10:18](https://www.youtube.com/watch?v=P0sGpnVVVx8?t=621) if you would like to skip ahead and get right into it 😃.

{% embed url="https://www.youtube.com/watch?v=P0sGpnVVVx8" caption="Learn The Graph with Figment's 101 Pathway" %}

- Create a subgraph scaffold @ [13:15](https://youtu.be/P0sGpnVVVx8?t=791)
- Tweaking the manifest @ [22:00](https://youtu.be/P0sGpnVVVx8?t=1320)
- Define the schema @ [27:47](https://youtu.be/P0sGpnVVVx8?t=1667)
- Implement the mappings @ [38:22](https://youtu.be/P0sGpnVVVx8?t=2297)

## 👣 Next Steps

Ok, enough of setup! Let's start getting our hands dirty with the first basic step: Running a local Graph node to listen to the Ethereum network.
