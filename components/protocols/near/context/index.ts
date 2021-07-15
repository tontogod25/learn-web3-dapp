import { createContext, Dispatch } from 'react';
import { getSafeEnv } from '@near/utils'

type Action =
    | { type: 'SetNetworkId', networkId: string }
    | { type: 'SetAccountId', accountId: string | undefined }
    | { type: 'SetSecretKey', secretKey: string | undefined }
    | { type: 'SetContractId', contractId: string | undefined}

const initialState = {
    networkId: getSafeEnv()
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
        default:
            return state
    }
}

type State = {
    networkId: string
    accountId?: string
    secretKey?: string
    contractId?: string
}

const NearContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export { NearContext, initialState, appStateReducer }
export type { State }
