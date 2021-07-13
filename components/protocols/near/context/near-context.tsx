import React, { useReducer, useContext, createContext, Dispatch, useEffect} from 'react';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { keyStores, ConnectConfig  } from "near-api-js";
import { CHAINS, NEAR_NETWORKS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';

const networkfromString = (network: string) : NEAR_NETWORKS => 
    network === "mainnet"
        ? NEAR_NETWORKS.MAINNET
        : NEAR_NETWORKS.TESTNET

const networkfromEnum = (network: NEAR_NETWORKS) : string =>
    network === NEAR_NETWORKS.MAINNET
        ? "mainnet"
        : "testnet"

export const getSafeEnv = (): string =>
    process.env.NEAR_NETWORK
        ? process.env.NEAR_NETWORK
        : "testnet"

const buildConfigFromNetwork = () : ConnectConfig => {
    const networkId: string = getSafeEnv();
    const walletUrl: string = `https://wallet.${networkId}.near.org`;
    const helperUrl: string = `https://helper.${networkId}.near.org`;
    const nodeUrl: string = getDatahubNodeURL(CHAINS.NEAR, networkfromString(networkId));
    const keyStore: InMemoryKeyStore = new keyStores.InMemoryKeyStore();

    const config = {
        keyStore,
        networkId,
        nodeUrl,
        helperUrl,
        walletUrl,
    }

    return config;
}

/*
const nearContextToFlatObject = (nearContext: NearContextT) => {
    const account = nearContext?.accountId;
    const secret = nearContext?.keypair?.toString();
    const network = nearContext.config.networkId;
}
const NearContext = createContext<Partial<NearContextT>>({});
*/

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

const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);
    useEffect(() => {
        console.log('coucou B')
    }, [state])
    return (
        <NearContext.Provider value={{ state, dispatch }}>
            { children}
        </NearContext.Provider>
    );
}

function useAppState() {
  return useContext(NearContext)
}

export { useAppState, AppStateProvider }
