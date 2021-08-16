import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    network?: string
    address?: string
    secret?: string
    contractAddress?: string
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetwork', network?: string }
    | { type: 'SetAddress', address?: string }
    | { type: 'SetSecret', secret?: string }
    | { type: 'SetContractAddress', contractAddress?: string }

const initialState = {
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetIndex':
            return { ...state, index: action.index }
        case 'SetNetwork':
            return { ...state, network: action.network }
        case 'SetAddress':
            return { ...state, address: action.address }
        case 'SetSecret':
            return { ...state, secret: action.secret }
        case 'SetContractAddress':
            return { ...state, contractAddress: action.contractAddress }    
        default:
            return state
    }
}

const CeloContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { CeloContext, initialState, appStateReducer }
