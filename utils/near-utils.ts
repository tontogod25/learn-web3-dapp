import { keyStores, ConnectConfig  } from "near-api-js";

import { CHAINS, NEAR_NETWORKS, NEAR_PROTOCOLS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';


export const getNearConfig = () => {
    const keyStore = new keyStores.InMemoryKeyStore();
    
    const url = getDatahubNodeURL(CHAINS.NEAR, NEAR_NETWORKS.TESTNET, NEAR_PROTOCOLS.RPC)
    
    const config: ConnectConfig = {
        keyStore,
        networkId: NEAR_NETWORKS.TESTNET.toLowerCase(),
        nodeUrl: url,
    };
    
    return config;
}

