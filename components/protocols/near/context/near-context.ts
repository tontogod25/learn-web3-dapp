import { createContext } from 'react';

import { Connection, keyStores } from 'near-api-js';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores';
import { getNearConfig } from 'utils/near-utils';

interface NearContextT {
    connection: Connection,
    keyStore: InMemoryKeyStore,
}

const defaultConfig = getNearConfig()
const keyStore = new InMemoryKeyStore();
const connection = Connection.fromConfig(defaultConfig);

const defaultNearContext: NearContextT = {
    keyStore,
    connection
}

// const NearContext = createContext(defaultNearContext);
const NearContext = createContext<Partial<NearContextT>>({});

// export { NearContext, defaultNearContext };
export { NearContext };
