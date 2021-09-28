import {
  GraphNode,
  ScaffoldSubGraph,
  HackingTheManifest,
} from '@the-graph/components/steps';
import {Nav} from '@the-graph/components';
import Layout from 'components/shared/Layout';
import {useReducer, useEffect} from 'react';
import {useLocalStorage} from 'hooks';
import {StepType, ChainType} from 'types';
import {
  protocolReducer,
  initialState,
  TheGraphContext,
  State,
} from '@the-graph/context';

const TheGraph: React.FC<{step: StepType}> = ({step}) => {
  console.log('here');
  const [storageState, setStorageState] = useLocalStorage<State>(
    'the_graph',
    initialState,
  );
  const [state, dispatch] = useReducer(protocolReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state, step]);

  return (
    <TheGraphContext.Provider value={{state, dispatch}}>
      <div style={{minHeight: '250px', marginBottom: '10vh'}}>
        {step.id === 'run-a-graph-node' && <GraphNode />}
        {step.id === 'scaffold-a-subgraph' && <ScaffoldSubGraph />}
        {step.id === 'hacking-the-manifest' && <HackingTheManifest />}
        <Nav />
      </div>
    </TheGraphContext.Provider>
  );
};

const WithLayoutTheGraph: React.FC<{
  chain: ChainType;
}> = ({chain}) => {
  return Layout(TheGraph, chain);
};

export default WithLayoutTheGraph;
