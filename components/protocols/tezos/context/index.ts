import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    network?: string
    secret?: string
    address?: string
    password?: string
    email?: string
    mnemonic?: string
    contract?: string
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetwork', network?: string }
    | { type: 'SetSecret', secret?: string }
    | { type: 'SetAddress', address?: string }
    | { type: 'SetPassword', password?: string }
    | { type: 'SetEmail', email?: string }
    | { type: 'SetMnemonic', mnemonic?: string }
    | { type: 'SetContract', contract?: string }

const initialState = {
    index: 0,
    network: 'florencenet'
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetIndex':
            return { ...state, index: action.index }
        case 'SetNetwork':
            return { ...state, network: action.network }
        case 'SetSecret':
            return { ...state, secret: action.secret }
        case 'SetAddress':
            return { ...state, address: action.address }
        case 'SetPassword':
            return { ...state, password: action.password }
        case 'SetEmail':
            return { ...state, email: action.email }
        case 'SetMnemonic':
            return { ...state, mnemonic: action.mnemonic }  
        case 'SetContract':
            return { ...state, contract: action.contract }  
        default:
            return state
    }
}

const TezosContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { TezosContext, initialState, appStateReducer }
