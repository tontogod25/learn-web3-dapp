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
import {aliases} from '@ceramic/lib';

const IdxContext = createContext<{
  idxRef?: MutableRefObject<IDX>;
  ceramicRef?: MutableRefObject<CeramicClient>;
  currentUserDID?: string | null | undefined;
  setCurrentUserDID?: Dispatch<SetStateAction<string | null | undefined>>;
}>({});

type Web3AuthProviderProps = {
  children: JSX.Element;
  ceramicNodeUrl: string;
};

const Web3AuthProvider = (props: Web3AuthProviderProps) => {
  const {children, ceramicNodeUrl} = props;
  const [currentUserDID, setCurrentUserDID] = useState<
    string | null | undefined
  >(null);

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
  logIn: (address: string) => Promise<string | undefined>;
  currentUserDID: string | null | undefined;
};

const useIdx = (): UseIdxHook => {
  const {idxRef, ceramicRef, currentUserDID, setCurrentUserDID} =
    useContext(IdxContext);

  if (!ceramicRef || !idxRef) {
    throw new Error('Web3AuthProvider not used.');
  }

  const logIn = async (address: string): Promise<string | undefined> => {
    // Request authentication using 3IDConnect

    // Create provider instance

    // Set DID instance on HTTP client

    // Set the provider to Ceramic

    // Authenticate the 3ID
    const userDID = undefined;

    if (setCurrentUserDID) {
      setCurrentUserDID(userDID);
    }

    // Create IDX instance
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

export {IdxContext, useIdx, Web3AuthProvider};
