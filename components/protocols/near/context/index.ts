import { createContext, Dispatch } from 'react'
import { getSafeEnv } from '@near/lib'

export type State = {
    network: string
    index: number
    accountId?: string
    secret?: string
    contractId?: string
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetwork', network: string }
    | { type: 'SetAccountId', accountId: string | undefined }
    | { type: 'SetSecret', secret: string | undefined }
    | { type: 'SetContractId', contractId: string | undefined}

const initialState = {
    network: getSafeEnv(),
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetAccountId':
            return { ...state, accountId: action.accountId }
        case 'SetSecret':
            return { ...state, secret: action.secret }
        case 'SetNetwork':
            return { ...state, network: action.network }
        case 'SetContractId':
            return { ...state, contractId: action.contractId }
        case 'SetIndex':
            return { ...state, index: action.index }
        default:
            return state
    }
}

const NearContext = createContext<{
    state: State
    dispatch: Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null
});

export { NearContext, initialState, appStateReducer }
