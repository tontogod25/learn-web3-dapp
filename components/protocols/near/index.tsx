import {
  Connect,
  Keys,
  Account,
  Balance,
  Transfer,
  Deploy,
  Getter,
  Setter,
} from '@figment-near/components/steps';
import Nav from '@figment-near/components/nav';
import {ChainType, PROTOCOL_STEPS_ID, MarkdownForChainIdT} from 'types';
import Layout from 'components/shared/Layout';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Near: React.FC = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state);

  return (
    <>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_KEYPAIR && <Keys />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
    </>
  );
};

const WithLayoutNear: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Near, chain, markdown);
};

export default WithLayoutNear;
