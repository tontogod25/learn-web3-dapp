import Nav from '@figment-polygon/components/nav';
import {PROTOCOL_STEPS_ID} from 'types';
import * as Steps from '@figment-polygon/components/steps';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Polygon: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(global_state);

  return (
    <>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Steps.Connect />}
      {stepId === PROTOCOL_STEPS_ID.QUERY_CHAIN && <Steps.Query />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Steps.Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Steps.Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Steps.Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Steps.Setter />}
      {stepId === PROTOCOL_STEPS_ID.RESTORE_ACCOUNT && <Steps.Restore />}
    </>
  );
};

export default Polygon;
