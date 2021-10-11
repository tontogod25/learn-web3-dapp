import {
  Node,
  Subgraph,
  Manifest,
  Query,
  Mapping,
  Entity,
} from '@the-graph/components/steps';
import Layout from 'components/shared/Layout';
import {ChainType, MarkdownForChainIdT, PROTOCOL_STEPS_ID} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import SetupWizard from 'components/shared/SetupWizard';

const TheGraph: React.FC = () => {
  const {state: globalState} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(globalState);

  return (
    <>
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && (
        <SetupWizard showText={true} />
      )}
      {stepId === PROTOCOL_STEPS_ID.GRAPH_NODE && <Node />}
      {stepId === PROTOCOL_STEPS_ID.SCAFFOLD && <Subgraph />}
      {stepId === PROTOCOL_STEPS_ID.MANIFEST && <Manifest />}
      {stepId === PROTOCOL_STEPS_ID.ENTITIES && <Entity />}
      {stepId === PROTOCOL_STEPS_ID.MAPPINGS && <Mapping />}
      {stepId === PROTOCOL_STEPS_ID.QUERY && <Query />}
    </>
  );
};

const WithLayoutTheGraph: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(TheGraph, chain, markdown);
};

export default WithLayoutTheGraph;
