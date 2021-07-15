import type { Dispatch, SetStateAction } from 'react'

// api call
export type NearConnectReponse = string


// context stuff 
export type Action =
    | { type: 'SetNetworkId', networkId: string }
    | { type: 'SetAccountId', accountId: string | undefined }
    | { type: 'SetSecretKey', secretKey: string | undefined }
    | { type: 'SetContractId', contractId: string | undefined}

export type State = {
    networkId: string
    accountId?: string
    secretKey?: string
    contractId?: string
}

// Components

export type CheckAccountIdPropsT = {
    networkId: string
    freeAccountId: string
    setFreeAccountId: Dispatch<SetStateAction<string>>
    setIsFreeAccountId: Dispatch<SetStateAction<boolean>>
}


export type AlertT = "success" | "info" | "warning" | "error" | undefined

export type EntryT = {
    msg: string
    display: (value: string) => string
    value: string
}