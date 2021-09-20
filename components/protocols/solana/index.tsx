import {
  appStateReducer,
  initialState,
  SolanaContext,
  State,
} from '@solana/context';
import Layout from 'components/shared/Layout';
import React, {useEffect, useReducer} from 'react';
import {StepType, ChainType} from 'types';
import {Nav} from '@solana/components';
import {useLocalStorage} from 'hooks';
import {
  Connect,
  Keypair,
  Fund,
  Balance,
  Transfer,
  Deploy,
  Greeter,
  Getter,
  Setter,
} from '@solana/components/steps';

const Solana: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    'solana',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state, step]);

  return (
    <SolanaContext.Provider value={{state, dispatch}}>
      <div style={{minHeight: '250px', marginBottom: '10vh'}}>
        {step.id === 'connect' && <Connect />}
        {step.id === 'account' && <Keypair />}
        {step.id === 'fund' && <Fund />}
        {step.id === 'balance' && <Balance />}
        {step.id === 'transfer' && <Transfer />}
        {step.id === 'deploy' && <Deploy />}
        {step.id === 'greeter' && <Greeter />}
        {step.id === 'getter' && <Getter />}
        {step.id === 'setter' && <Setter />}
        <Nav />
      </div>
    </SolanaContext.Provider>
  );
};

const WrappedSolana: React.FC<{chain: ChainType}> = ({chain}) => {
  return Layout(Solana, chain);
};

export default WrappedSolana;
