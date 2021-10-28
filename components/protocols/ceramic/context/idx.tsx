import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {IDX} from '@ceramicstudio/idx';
import CeramicClient from '@ceramicnetwork/http-client';
import {EthereumAuthProvider, ThreeIdConnect} from '@3id/connect';
import {DID} from 'dids';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import {aliases} from '@figment-ceramic/lib';
import detectEthereumProvider from '@metamask/detect-provider';
import {BasicProfile} from '@ceramicstudio/idx-constants';
import {IdxSchema, QuoteSchemaT} from '@figment-ceramic/types';
import {IdentityKey, IdentityStore} from '@figment-ceramic/lib/identityStore';

type UserData = {
  basicProfile?: BasicProfile;
  figment?: QuoteSchemaT;
};

const IdxContext = createContext<{
  idxRef?: MutableRefObject<IDX>;
  ceramicRef?: MutableRefObject<CeramicClient>;
  isConnected: boolean;
  setIsConnected?: Dispatch<SetStateAction<boolean>>;
  currentUserAddress?: string;
  setCurrentUserAddress?: Dispatch<SetStateAction<string | undefined>>;
  isAuthenticated: boolean;
  setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
  currentUserDID?: string;
  setCurrentUserDID?: Dispatch<SetStateAction<string | undefined>>;
  currentUserData?: UserData;
  setCurrentUserData?: Dispatch<SetStateAction<UserData | undefined>>;
  identityStore?: IdentityStore;
}>({
  isConnected: false,
  isAuthenticated: false,
});

type Web3AuthProviderProps = {
  children: JSX.Element;
  ceramicNodeUrl: string;
  identityStore?: IdentityStore;
};

const Web3AuthProvider = (props: Web3AuthProviderProps) => {
  const {children, ceramicNodeUrl, identityStore} = props;
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUserAddress, setCurrentUserAddress] = useState<
    string | undefined
  >(undefined);
  const [currentUserDID, setCurrentUserDID] = useState<string | undefined>(
    undefined,
  );
  const [currentUserData, setCurrentUserData] = useState<UserData | undefined>(
    undefined,
  );

  const ceramicRef = useRef<CeramicClient>(new CeramicClient(ceramicNodeUrl));
  const idxRef = useRef<IDX>(new IDX({ceramic: ceramicRef.current, aliases}));

  useEffect(() => {
    if (identityStore) {
      const getInitialStoredData = async () => {
        const initialAddress = await identityStore.getAddress();
        const initialDID = await identityStore.getDID();
        const initialBasicProfile = await identityStore.getBasicProfile();

        setCurrentUserAddress(initialAddress as string | undefined);
        setCurrentUserDID(initialDID as string | undefined);
        setCurrentUserData({
          basicProfile: initialBasicProfile as BasicProfile | undefined,
        });
      };

      getInitialStoredData();
    }
  }, [identityStore]);

  return (
    <IdxContext.Provider
      value={{
        idxRef,
        ceramicRef,
        isConnected,
        setIsConnected,
        currentUserAddress,
        setCurrentUserAddress,
        isAuthenticated,
        setIsAuthenticated,
        currentUserDID,
        setCurrentUserDID,
        currentUserData,
        setCurrentUserData,
        identityStore,
      }}
    >
      {children}
    </IdxContext.Provider>
  );
};

type UseIdxHook = {
  idx: IDX;
  ceramic: CeramicClient;
  connect: () => Promise<string>;
  disconnect: () => void;
  logIn: () => Promise<string>;
  logOut: () => void;
  isConnected: boolean;
  currentUserAddress?: string;
  isAuthenticated: boolean;
  currentUserDID?: string;
  currentUserData?: UserData;
  setCurrentUserData: (
    key: keyof UserData,
    value: BasicProfile | QuoteSchemaT,
  ) => Promise<void>;
};

const useIdx = (): UseIdxHook => {
  const {
    idxRef,
    ceramicRef,
    identityStore,
    isConnected,
    setIsConnected,
    currentUserAddress,
    setCurrentUserAddress,
    isAuthenticated,
    setIsAuthenticated,
    currentUserDID,
    setCurrentUserDID,
    currentUserData,
    setCurrentUserData,
  } = useContext(IdxContext);

  if (!ceramicRef || !idxRef) {
    throw new Error('Web3AuthProvider not used.');
  }

  // Connect to Metamask
  const connect = async (): Promise<string | boolean> => {
    const provider = await detectEthereumProvider();

    if (provider) {
      // Connect to Polygon using Web3Provider and Metamask.
      // Find more information at: https://docs.metamask.io/guide/rpc-api.html.
      // NOTE: Be careful not to use deprecated method!
      // Define address and network
      const addresses = undefined;
      const address = undefined;

      if (address) {
        if (setIsConnected) {
          setIsConnected(true);
        }

        if (setCurrentUserAddress) {
          setCurrentUserAddress(address);
        }

        if (identityStore) {
          await identityStore.setAddress(address);
        }

        return address;
      }

      return false;
    } else {
      throw new Error('Please install Metamask at https://metamask.io');
    }
  };

  // Disconnect Metamask
  const disconnect = async (): Promise<void> => {
    if (setIsConnected) {
      setIsConnected(false);
    }

    resetCurrentUserAddress();
  };

  // Log in using 3ID Connect and IDX protocol
  const logIn = useCallback(async (): Promise<string> => {
    const address = await connect();

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

    // Create IDX instance

    // Get current user's basic profile
    const basicProfile = await getBasicProfile(userDID);

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }

    if (setCurrentUserDID) {
      setCurrentUserDID(userDID);
    }

    if (identityStore) {
      await identityStore.setDID(userDID);
    }

    if (basicProfile && setUserData) {
      await setUserData(IdxSchema.BasicProfile, basicProfile);
    }

    return userDID;
  }, [setIsAuthenticated]);

  // Log out user
  const logOut = useCallback(async () => {
    await disconnect();

    if (setIsAuthenticated) {
      setIsAuthenticated(false);
    }

    resetCurrentUserDID();
    resetCurrentUserData();
  }, [setIsAuthenticated]);

  // Get basic profile for DID
  const getBasicProfile = async (DID: string) => {
    return idxRef.current.get<BasicProfile>(IdxSchema.BasicProfile, DID);
  };

  // Set user data
  const setUserData = async (
    key: keyof UserData,
    data: BasicProfile | QuoteSchemaT | null,
  ) => {
    if (setCurrentUserData) {
      setCurrentUserData((prevState) => {
        return {
          ...prevState,
          [key]: data,
        };
      });

      if (key === 'basicProfile') {
        if (identityStore) {
          await identityStore.setBasicProfile(data as BasicProfile);
        }
      }
    }
  };

  const resetCurrentUserAddress = () => {
    if (setCurrentUserAddress) {
      setCurrentUserAddress(undefined);
    }

    if (identityStore) {
      identityStore.clear(IdentityKey.ADDRESS);
    }
  };

  const resetCurrentUserDID = () => {
    if (setCurrentUserDID) {
      setCurrentUserDID(undefined);
    }

    if (identityStore) {
      identityStore.clear(IdentityKey.DID);
    }
  };

  const resetCurrentUserData = () => {
    if (setCurrentUserData) {
      setCurrentUserData(undefined);
    }

    if (identityStore) {
      identityStore.clear(IdentityKey.BASIC_PROFILE);
    }
  };

  return {
    idx: idxRef.current,
    ceramic: ceramicRef.current,
    connect,
    disconnect,
    isConnected,
    currentUserAddress,
    logIn,
    logOut,
    isAuthenticated,
    currentUserDID,
    currentUserData,
    setCurrentUserData: setUserData,
  };
};

export {IdxContext, useIdx, Web3AuthProvider};
