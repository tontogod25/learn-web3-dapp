import * as Steps from '@figment-the-graph/components/steps';
import {PROTOCOL_STEPS_ID} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const TheGraph: React.FC = () => {
  const {state: globalState} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(globalState);

  return (
    <>
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.GRAPH_NODE && <Steps.Node />}
      {stepId === PROTOCOL_STEPS_ID.SUBGRAPH_SCAFFOLD && <Steps.Subgraph />}
      {stepId === PROTOCOL_STEPS_ID.SUBGRAPH_MANIFEST && <Steps.Manifest />}
      {stepId === PROTOCOL_STEPS_ID.SUBGRAPH_SCHEMA && <Steps.Entity />}
      {stepId === PROTOCOL_STEPS_ID.SUBGRAPH_MAPPINGS && <Steps.Mapping />}
      {stepId === PROTOCOL_STEPS_ID.SUBGRAPH_QUERY && <Steps.Query />}
    </>
  );
};

export default TheGraph;
