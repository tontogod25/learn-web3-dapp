import { createContext, Dispatch } from 'react';

export type State = {
    index: number
    network?: string
}

type Action =
    | { type: 'SetIndex', index: number }
    | { type: 'SetNetwork', network?: string }

const initialState = {
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetIndex':
            return { ...state, index: action.index }
        case 'SetNetwork':
            return { ...state, network: action.network }
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
