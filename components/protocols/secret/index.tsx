import {useEffect, useReducer} from 'react';
import Layout from 'components/shared/Layout';
import {
  Connect,
  Account,
  Balance,
  Transfer,
  Deploy,
  Getter,
  Setter,
} from '@figment-secret/components/steps';
import {
  appStateReducer,
  initialState,
  SecretContext,
} from '@figment-secret/context';
import {useLocalStorage} from '@figment-secret/hooks';
import Nav from '@figment-secret/components/nav';
import {PROTOCOL_STEPS_ID, ChainType} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import SetupWizard from 'components/shared/SetupWizard';

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
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && (
        <SetupWizard showText={true} />
      )}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Account />}
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
