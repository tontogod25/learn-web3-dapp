import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    networkId?: string
    publicKey?: string
    secretKey?: string 
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetworkId', networkId?: string }
    | { type: 'SetPublicKey', publicKey?: string }
    | { type: 'SetSecretKey', secretKey?: string }

const initialState = {
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetIndex':
            return { ...state, index: action.index }
        case 'SetNetworkId':
            return { ...state, networkId: action.networkId }
        case 'SetSecretKey':
            return { ...state, secretKey: action.secretKey }
        case 'SetPublicKey':
            return { ...state, publicKey: action.publicKey }    
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
