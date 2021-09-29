import {Nav} from '@polygon/components';
import Layout from 'components/shared/Layout';
import {useReducer, useEffect} from 'react';
import {useLocalStorage} from 'hooks';
import {ChainType, MarkdownForChainT, StepType} from 'types';
import {
  Connect,
  Balance,
  Query,
  Restore,
  Deploy,
  Setter,
  Getter,
  Transfer,
} from '@polygon/components/steps';
import {
  appStateReducer,
  initialState,
  PolygonContext,
  State,
} from '@polygon/context';

const Polygon: React.FC<{step: StepType}> = ({step}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    'polygon',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state, step]);

  return (
    <PolygonContext.Provider value={{state, dispatch}}>
      {step.id === 'connect' && <Connect />}
      {step.id === 'query' && <Query />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'setter' && <Setter />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'restore' && <Restore />}
      <Nav />
    </PolygonContext.Provider>
  );
};

const WithLayoutPolygon: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainT;
}> = ({chain, markdown}) => {
  return Layout(Polygon, chain, markdown);
};

export default WithLayoutPolygon;
