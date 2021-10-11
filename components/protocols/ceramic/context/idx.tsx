import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
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
import detectEthereumProvider from '@metamask/detect-provider';

const IdxContext = createContext<{
  idxRef?: MutableRefObject<IDX>;
  ceramicRef?: MutableRefObject<CeramicClient>;
  isAuthenticated: boolean;
  setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
});

type Web3AuthProviderProps = {
  children: JSX.Element;
  ceramicNodeUrl: string;
};

const Web3AuthProvider = (props: Web3AuthProviderProps) => {
  const {children, ceramicNodeUrl} = props;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const ceramicRef = useRef<CeramicClient>(new CeramicClient(ceramicNodeUrl));
  const idxRef = useRef<IDX>(new IDX({ceramic: ceramicRef.current, aliases}));

  return (
    <IdxContext.Provider
      value={{
        idxRef,
        ceramicRef,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </IdxContext.Provider>
  );
};

type UseIdxHook = {
  idx: IDX;
  ceramic: CeramicClient;
  connect: () => Promise<string | undefined>;
  logIn: (address: string) => Promise<string | undefined>;
  logOut: () => void;
  isAuthenticated: boolean;
};

const useIdx = (): UseIdxHook => {
  const {idxRef, ceramicRef, isAuthenticated, setIsAuthenticated} =
    useContext(IdxContext);

  if (!ceramicRef || !idxRef) {
    throw new Error('Web3AuthProvider not used.');
  }

  const connect = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const addresses = await provider.request({method: 'eth_requestAccounts'});
      return addresses[0];
    } else {
      alert('Please install Metamask at https://metamask.io');
    }
  };

  const logIn = useCallback(
    async (address: string): Promise<string | undefined> => {
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

      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }

      // Create IDX instance
      idxRef.current = new IDX({
        ceramic: ceramicRef.current,
        aliases,
      });

      return userDID;
    },
    [setIsAuthenticated],
  );

  const logOut = useCallback(() => {
    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

  return {
    idx: idxRef.current,
    ceramic: ceramicRef.current,
    connect,
    logIn,
    logOut,
    isAuthenticated,
  };
};

export {IdxContext, useIdx, Web3AuthProvider};
