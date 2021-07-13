// import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { useEffect } from "react";
import { ChainType } from "types/types";
// import { getSafeEnv } from './context/near-context';
import NearApp from "./NearApp";
import { AppStateProvider } from "./context/near-context";

/*
// Begin reducer stuff
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
// End reducer stuff 

// Begin Context Stuff
type State = {
    networkId: string
    accountId?: string
    secretKey?: string
    contractId?: string
}

const AppContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});

export function useAppState() {
    return useContext(AppContext)
}

const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);
    
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            { children}
        </AppContext.Provider>
    );
}
*/
// End Context Stuff

const Near = ({ chain }: { chain: ChainType }) => {
    useEffect(() => {
        console.log('coucou A')
    }, [])
    return (
        <AppStateProvider>
            <NearApp chain={chain} />
        </AppStateProvider>
    )
}

export default Near
