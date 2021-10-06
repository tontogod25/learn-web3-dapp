import {Node, Subgraph, Manifest, Query} from '@the-graph/components/steps';
import Nav from '@the-graph/components/nav';
import Layout from 'components/shared/Layout';
import {useReducer} from 'react';
import {ChainType, MarkdownForChainIdT, PROTOCOL_STEPS_ID} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import {appReducer, initialState, TheGraphContext} from '@the-graph/context';
import SetupWizard from 'components/shared/SetupWizard';

const TheGraph: React.FC = () => {
  const {state: globalState} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(globalState);

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <TheGraphContext.Provider value={{state, dispatch}}>
      {/* <Nav /> */}
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && <SetupWizard />}
      {stepId === PROTOCOL_STEPS_ID.RUN_A_GRAPH_NODE && <Node />}
      {stepId === PROTOCOL_STEPS_ID.SCAFFOLD_A_SUBGRAPH && <Subgraph />}
      {stepId === PROTOCOL_STEPS_ID.HACKING_THE_MANIFEST && <Manifest />}
      {stepId === PROTOCOL_STEPS_ID.QUERY_THE_PUNK && <Query />}
    </TheGraphContext.Provider>
  );
};

const WithLayoutTheGraph: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(TheGraph, chain, markdown);
};

export default WithLayoutTheGraph;
