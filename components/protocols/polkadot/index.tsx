import {useEffect, useReducer} from 'react';
import * as Steps from '@figment-polkadot/components/steps';
import {
  appStateReducer,
  initialState,
  PolkadotContext,
} from '@figment-polkadot/context';
import {useLocalStorage} from '@figment-polkadot/hooks';
import {PROTOCOL_STEPS_ID} from 'types';
import Nav from '@figment-polkadot/components/nav';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Polkadot: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(global_state);

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
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Steps.Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Steps.Account />}
      {stepId === PROTOCOL_STEPS_ID.RESTORE_ACCOUNT && <Steps.Restore />}
      {stepId === PROTOCOL_STEPS_ID.ESTIMATE_FEES && <Steps.Estimate />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Steps.Balance />}
      {stepId === PROTOCOL_STEPS_ID.ESTIMATE_DEPOSIT && <Steps.Deposit />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Steps.Transfer />}
    </PolkadotContext.Provider>
  );
};

export default Polkadot;
