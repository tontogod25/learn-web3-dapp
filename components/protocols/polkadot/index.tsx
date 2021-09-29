import {useEffect, useReducer} from 'react';
import {
  Connect,
  Account,
  Balance,
  Transfer,
  Estimate,
  Restore,
  Deposit,
} from '@polka/components/steps';
import {appStateReducer, initialState, PolkadotContext} from '@polka/context';
import {useLocalStorage} from '@polka/hooks';
import {ChainType, StepType} from 'types';
import Nav from '@polka/components/nav';
import Layout from 'components/shared/Layout';

const Polkadot: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage(
    'polkadot',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  return (
    <PolkadotContext.Provider value={{state, dispatch}}>
      <Nav />
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Account />}
      {step.id === 'restore' && <Restore />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'estimate' && <Estimate />}
      {step.id === 'deposit' && <Deposit />}
      {step.id === 'transfer' && <Transfer />}
    </PolkadotContext.Provider>
  );
};

const WithLayoutPolkadot: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Polkadot, chain, markdown);
};

export default WithLayoutPolkadot;
