import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import {PROTOCOL_STEPS_ID} from 'types';
import {StepMenuBar} from 'components/shared/Layout/StepMenuBar';
import Auth from '@figment-ceramic/components/auth';

const Nav = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state);

  return (
    <StepMenuBar>
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION ? (
        <Auth onlyConnect={true} />
      ) : (
        stepId !== PROTOCOL_STEPS_ID.PROJECT_SETUP && <Auth />
      )}
    </StepMenuBar>
  );
};

export default Nav;
