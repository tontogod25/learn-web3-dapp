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

export type PolkadotAccountResponse = {
  account: PolkadotAccount
  mnemonic: string
}

export type PolkadotAccount = {
  address: string
  addressRaw: any
  publicKey: any
  type: string
}

export type PolkadotKeypairType = {
  account: PolkadotAccount
  mnemonic: string
}