import * as Steps from '@figment-avalanche/components/steps';
import Nav from '@figment-avalanche/components/nav';
import {PROTOCOL_STEPS_ID} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Avalanche: React.FC = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state) as any;

  return (
    <>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Steps.Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_KEYPAIR && <Steps.Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Steps.Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Steps.Transfer />}
      {stepId === PROTOCOL_STEPS_ID.EXPORT_TOKEN && <Steps.Export />}
      {stepId === PROTOCOL_STEPS_ID.IMPORT_TOKEN && <Steps.Import />}
    </>
  );
};

export default Avalanche;
