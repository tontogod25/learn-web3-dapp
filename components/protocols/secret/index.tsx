import {useEffect, useReducer} from 'react';
import * as Steps from '@figment-secret/components/steps';
import {
  appStateReducer,
  initialState,
  SecretContext,
} from '@figment-secret/context';
import {useLocalStorage} from '@figment-secret/hooks';
import Nav from '@figment-secret/components/nav';
import {PROTOCOL_STEPS_ID} from 'types';
import {useGlobalState} from 'context';
import {getStepId} from 'utils/context';

const Secret: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getStepId(global_state);

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
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Steps.Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Steps.Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Steps.Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Steps.Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Steps.Deploy />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Steps.Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Steps.Setter />}
    </SecretContext.Provider>
  );
};

export default Secret;
