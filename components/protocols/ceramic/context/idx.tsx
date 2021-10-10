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
    // Request authentication using 3IDConnect.
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#4-request-authentication

    // Create provider instance.
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#5-create-provider-instance

    // Create a DID instance.
    // Find more information here: https://developers.ceramic.network/build/javascript/http/
    // NOTE: We want to use only ThreeIdResolver here

    // Set DID instance on HTTP client
    // Find more information here: https://developers.ceramic.network/build/javascript/http/#7-set-did-instance-on-http-client

    // Set the provider to Ceramic
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#6-set-the-provider-to-ceramic

    // Authenticate the 3ID
    // Find more information here: https://developers.ceramic.network/authentication/3id-did/3id-connect/#7-authenticate-the-3id
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
