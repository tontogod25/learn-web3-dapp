import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    network?: string
    secret?: string 
    address?: string 
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetwork', network?: string }
    | { type: 'SetAddress', address?: string }
    | { type: 'SetSecret', secret?: string }

const initialState = {
    index: 0,
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
        default:
            return state
    }
}

const AvalancheContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { AvalancheContext, initialState, appStateReducer }
