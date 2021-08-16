import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    networkId?: string
    publicKey?: string
    secretKey?: string 
    contractKey?: string 
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetworkId', networkId?: string }
    | { type: 'SetPublicKey', publicKey?: string }
    | { type: 'SetSecretKey', secretKey?: string }
    | { type: 'SetContractKey', contractKey?: string }

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
        case 'SetContractKey':
            return { ...state, contractKey: action.contractKey }
        default:
            return state
    }
}

const SolanaContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { SolanaContext, initialState, appStateReducer }
