import {useEffect, useReducer} from 'react';
import {
  Connect,
  Keys,
  Account,
  Balance,
  Transfer,
  Deploy,
  Getter,
  Setter,
} from '@near/components/Steps';
import {appStateReducer, initialState, NearContext} from '@near/context';
import {useLocalStorage} from '@near/hooks';
import {Nav} from '@near/components';
import {ChainType, StepType} from 'types';
import Layout from 'components/shared/Layout';

const Near: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage('near', initialState);
  const [state, dispatch] = useReducer(appStateReducer, storageState);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  return (
    <NearContext.Provider value={{state, dispatch}}>
      {step.id === 'connect' && <Connect />}
      {step.id === 'keypair' && <Keys />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
      <Nav />
    </NearContext.Provider>
  );
};

const WithLayoutNear: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Near, chain, markdown);
};

export default WithLayoutNear;
