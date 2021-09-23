import {Connect} from '@the-graph/components/steps';
import Layout from 'components/shared/Layout';
import {useReducer, useEffect} from 'react';
import {Nav} from '@the-graph/components';
import {AppI} from '@the-graph/types';
import {useLocalStorage} from 'hooks';
import {StepType} from 'types';
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
        {step.id === 'connect' && <Connect />}
      </div>
    </TheGraphContext.Provider>
  );
};

/*
const TheGraph: React.FC<{step: StepType}> = ({step}) => {
          <Nav />

  return <div>coucou</div>;
};
*/
const WrappedTheGraph: React.FC<AppI> = ({chain}) => {
  return Layout(TheGraph, chain);
};

export default WrappedTheGraph;
