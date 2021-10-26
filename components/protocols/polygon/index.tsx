import Nav from '@figment-polygon/components/nav';
import Layout from 'components/shared/Layout';
import {ChainType, MarkdownForChainIdT, PROTOCOL_STEPS_ID} from 'types';
import {
  Connect,
  Balance,
  Query,
  Restore,
  Setter,
  Getter,
  Transfer,
} from '@figment-polygon/components/steps';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Polygon: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(global_state);

  return (
    <>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.QUERY_CHAIN && <Query />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
      {stepId === PROTOCOL_STEPS_ID.RESTORE_ACCOUNT && <Restore />}
    </>
  );
};

const WithLayoutPolygon: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Polygon, chain, markdown);
};

export default WithLayoutPolygon;
