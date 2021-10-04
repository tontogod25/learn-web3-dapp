import {useEffect, useReducer} from 'react';
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
import {useLocalStorage} from '@secret/hooks';
import Nav from '@secret/components/nav';
import Layout from 'components/shared/Layout';
import {PROTOCOL_STEPS_ID, ChainType} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Secret: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(global_state);

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
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_KEYPAIR && <Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
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
