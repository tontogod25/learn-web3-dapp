import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    networkId?: string
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetworkId', networkId?: string }

const initialState = {
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetIndex':
            return { ...state, index: action.index }
        case 'SetNetworkId':
            return { ...state, networkId: action.networkId }
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
