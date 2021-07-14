import { useEffect, useReducer } from "react";
import { ChainType } from "types/types";
import NearApp from "@near/App";
import { useLocalStorage } from '@near/hooks'
import { appStateReducer, initialState, NearContext } from '@near/context'

const Near = ({ chain }: { chain: ChainType }) => {
    const [storageState, setStorageState] = useLocalStorage("near", initialState)
    const [state, dispatch] = useReducer(appStateReducer, storageState);
    useEffect(() => {
        setStorageState(state)
    }, [state])
    return (
        <NearContext.Provider value={{ state, dispatch }}>
            <NearApp chain={chain} />
        </NearContext.Provider>
    )
}

export default Near
