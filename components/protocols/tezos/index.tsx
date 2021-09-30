import {useEffect, useReducer} from 'react';
import {
  Connect,
  Balance,
  Getter,
  Setter,
  Account,
  Deploy,
  Transfer,
} from '@tezos/components/steps';
import {appStateReducer, initialState, TezosContext} from '@tezos/context';
import {useLocalStorage} from '@tezos/hooks';
import Nav from '@tezos/components/nav';
import {ChainType, StepType} from 'types';
import Layout from 'components/shared/Layout';

const Tezos: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage(
    'tezos',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  return (
    <TezosContext.Provider value={{state, dispatch}}>
      <Nav />
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
    </TezosContext.Provider>
  );
};

const WithLayoutTezos: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Tezos, chain, markdown);
};

export default WithLayoutTezos;
