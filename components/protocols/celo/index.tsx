import {useEffect, useReducer} from 'react';
import {
  Connect,
  Account,
  Balance,
  Transfer,
  Swap,
  Deploy,
  Getter,
  Setter,
} from '@celo/components/steps';
import {appStateReducer, initialState, CeloContext} from '@celo/context';
import {useLocalStorage} from '@celo/hooks';
import {ChainType, StepType} from 'types';
import Layout from 'components/shared/Layout';
import {useGlobalState} from 'context';
import {Nav} from './components';

const Celo: React.FC<{step: StepType}> = ({step}) => {
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
    <CeloContext.Provider value={{state, dispatch}}>
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'swap' && <Swap />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
      <Nav />
    </CeloContext.Provider>
  );
};

const WithLayoutCelo: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Celo, chain, markdown);
};

export default WithLayoutCelo;
