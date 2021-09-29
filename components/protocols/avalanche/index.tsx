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
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'export' && <Export />}
      {step.id === 'import' && <Import />}
      <Nav />
    </AvalancheContext.Provider>
  );
};

const WithLayoutAvalanche: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Avalanche, chain, markdown);
};

export default WithLayoutAvalanche;
