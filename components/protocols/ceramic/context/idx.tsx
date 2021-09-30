import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';
import {IDX} from '@ceramicstudio/idx';
import CeramicClient from '@ceramicnetwork/http-client';
import {EthereumAuthProvider, ThreeIdConnect} from '@3id/connect';
import {DID} from 'dids';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import {CeramicApi} from '@ceramicnetwork/common';
import {aliases} from '@ceramic/lib';

export type State = {
  network: string;
  address?: string;
  DID?: string;
};

type Action =
  | {type: 'SetNetwork'; network: string}
  | {type: 'SetAddress'; address?: string}
  | {type: 'SetDID'; DID?: string};

const initialState = {
  network: 'testnet',
};

const IdxContext = createContext<{
  idxRef?: MutableRefObject<IDX>;
  ceramicRef?: MutableRefObject<CeramicClient>;
  currentUserDID?: string | null;
  setCurrentUserDID?: Dispatch<SetStateAction<string | null>>;
}>({});

type Web3AuthProviderProps = {
  children: JSX.Element;
  ceramicNodeUrl: string;
};

const Web3AuthProvider = (props: Web3AuthProviderProps) => {
  const {children, ceramicNodeUrl} = props;
  const [currentUserDID, setCurrentUserDID] = useState<string | null>(null);

  const ceramicRef = useRef<CeramicClient>(new CeramicClient(ceramicNodeUrl));
  const idxRef = useRef<IDX>(new IDX({ceramic: ceramicRef.current, aliases}));

  return (
    <IdxContext.Provider
      value={{
        idxRef,
        ceramicRef,
        currentUserDID,
        setCurrentUserDID,
      }}
    >
      {children}
    </IdxContext.Provider>
  );
};

type UseIdxHook = {
  idx: IDX;
  ceramic: CeramicClient;
  logIn: (address: string) => Promise<string>;
  currentUserDID: string | null;
};

const useIdx = (): UseIdxHook => {
  const {idxRef, ceramicRef, currentUserDID, setCurrentUserDID} =
    useContext(IdxContext);

  if (
    !ceramicRef ||
    !idxRef ||
    currentUserDID == undefined ||
    setCurrentUserDID == undefined
  ) {
    throw new Error('Web3AuthProvider not used.');
  }

  const logIn = async (address: string): Promise<string> => {
    const threeIdConnect = new ThreeIdConnect();

    const provider = new EthereumAuthProvider(window.ethereum, address);

    await threeIdConnect.connect(provider);

    const didInstance = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: {
        ...ThreeIdResolver.getResolver(ceramicRef.current),
      },
    });

    await ceramicRef.current.setDID(didInstance);

    const did = ceramicRef.current.did as DID;
    const userDID = await did.authenticate();

    if (setCurrentUserDID) {
      setCurrentUserDID(userDID);
    }

    idxRef.current = new IDX({
      ceramic: ceramicRef.current,
      aliases,
    });

    return userDID;
  };

  return {
    idx: idxRef.current,
    ceramic: ceramicRef.current,
    logIn,
    currentUserDID,
  };
};

export {IdxContext, initialState, useIdx, Web3AuthProvider};
