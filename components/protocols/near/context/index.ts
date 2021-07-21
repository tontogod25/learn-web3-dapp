import { createContext, Dispatch } from 'react';
import { getSafeEnv } from '@near/lib';
import type { State } from '@near/types';

type Action =
    | { type: 'SetNetworkId', networkId: string }
    | { type: 'SetAccountId', accountId: string | undefined }
    | { type: 'SetSecretKey', secretKey: string | undefined }
    | { type: 'SetContractId', contractId: string | undefined}
    | { type: 'SetIndex', index: number }

const initialState = {
    networkId: getSafeEnv(),
    index: 0,
}

function appStateReducer(state: State, action: Action): State  {
    switch (action.type) {
        case 'SetAccountId':
            return { ...state, accountId: action.accountId }
        case 'SetSecretKey':
            return { ...state, secretKey: action.secretKey }
        case 'SetNetworkId':
            return { ...state, networkId: action.networkId }
        case 'SetContractId':
            return { ...state, contractId: action.contractId }
        case 'SetIndex':
            return { ...state, index: action.index }
        default:
            return state
    }
}

const NearContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { NearContext, initialState, appStateReducer }
