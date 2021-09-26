import {
  Connect,
  Account,
  Balance,
  Transfer,
  Import,
  Export,
} from '@avalanche/components/steps';
import {Nav} from '@avalanche/components';
import {
  appStateReducer,
  initialState,
  AvalancheContext,
  State,
} from '@avalanche/context';

import Layout from 'components/shared/Layout';
import React, {useEffect, useReducer} from 'react';
import {StepType, ChainType} from 'types';
import {useLocalStorage} from 'hooks';

const Avalanche: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    'avalanche',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state, step]);

  return (
    <AvalancheContext.Provider value={{state, dispatch}}>
      <div style={{minHeight: '250px', marginBottom: '10vh'}}>
        {step.id === 'connect' && <Connect />}
        {step.id === 'account' && <Account />}
        {step.id === 'balance' && <Balance />}
        {step.id === 'transfer' && <Transfer />}
        {step.id === 'export' && <Export />}
        {step.id === 'import' && <Import />}
        <Nav />
      </div>
    </AvalancheContext.Provider>
  );
};

const WithLayoutAvalanche: React.FC<{chain: ChainType}> = ({chain}) => {
  return Layout(Avalanche, chain);
};

export default WithLayoutAvalanche;
