// coucou husky
import {useEffect, useReducer} from 'react';
import {Row} from 'antd';
import {
  Connect,
  Account,
  Balance,
  Transfer,
  Deploy,
  Getter,
  Setter,
} from '@secret/components/steps';
import {appStateReducer, initialState, SecretContext} from '@secret/context';
import {useAppState, useLocalStorage} from '@secret/hooks';
import {Sidebar, Step} from '@secret/components/layout';
import {Nav} from '@secret/components';
import type {AppI} from '@secret/types';
import {trackTutorialStepViewed} from '../../../utils/tracking-utils';
import Layout from 'components/shared/Layout';
import {ChainType, StepType} from 'types';

const Secret: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage(
    'secret',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  return (
    <SecretContext.Provider value={{state, dispatch}}>
      <Nav />
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
    </SecretContext.Provider>
  );
};

const WithLayoutSecret: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Secret, chain, markdown);
};

export default WithLayoutSecret;
