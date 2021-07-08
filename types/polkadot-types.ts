export type PolkadotConnectResponse = string
export type PolkadotConnectErrorResponse = {
  message: string
}

export type PolkadotQueryResponse = {
  genesisHash: string
  libVersion: string
  chain: string
  nodeName: string
  nodeVersion: string
  lastHeaderNumber: string
  lastHeaderHash: string
}

export type PolkadotQueryErrorResponse = {
  message: string
}