import {
  appStateReducer,
  initialState,
  SolanaContext,
  State,
} from '@solana/context';
import Layout from 'components/shared/Layout';
import React, {useEffect, useReducer} from 'react';
import {StepType, ChainType} from 'types';
import {useLocalStorage} from 'hooks';
import {useGlobalState} from 'context';
import Nav from '@solana/components/nav';
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
    <SolanaContext.Provider value={{state, dispatch}}>
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
    </SolanaContext.Provider>
  );
};

const WithLayoutSolana: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Solana, chain, markdown);
};

export default WithLayoutSolana;
