import {
  appStateReducer,
  initialState,
  CeramicContext,
  State,
} from '@ceramic/context';
import {IdxContext, Web3AuthProvider} from '@ceramic/context/idx';
import Layout from 'components/shared/Layout';
import React, {useEffect, useReducer} from 'react';
import {StepType, ChainType} from 'types';
import {useLocalStorage} from 'hooks';
import {useGlobalState} from 'context';
import {Nav} from '@ceramic/components';
import {
  Connect,
  LogIn,
  BasicProfile,
  CustomSchema,
} from '@ceramic/components/steps';

const Ceramic: React.FC<{step: StepType}> = ({step}) => {
  const {state: globalState} = useGlobalState();
  const [storageState, setStorageState] = useLocalStorage<State>(
    globalState.chain as string,
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state, step]);

  return (
    <CeramicContext.Provider value={{state, dispatch}}>
      <Web3AuthProvider
        ceramicNodeUrl={process.env.NEXT_PUBLIC_CERAMIC_TESTNET_URL}
      >
        <div style={{minHeight: '250px', marginBottom: '10vh'}}>
          {step.id === 'connect' && <Connect />}
          {step.id === 'login' && <LogIn />}
          {step.id === 'basicProfile' && <BasicProfile />}
          {step.id === 'customSchema' && <CustomSchema />}
          <Nav />
        </div>
      </Web3AuthProvider>
    </CeramicContext.Provider>
  );
};

const WithLayoutCeramic: React.FC<{chain: ChainType}> = ({chain}) => {
  return Layout(Ceramic, chain);
};

export default WithLayoutCeramic;
