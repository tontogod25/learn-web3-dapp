import {Nav} from '@polygon/components';
import Layout from 'components/shared/Layout';
import {AppI} from '@polygon/types';
import {useReducer, useEffect} from 'react';
import {useLocalStorage} from 'hooks';
import {StepType} from 'types';
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
      <div style={{minHeight: '250px', marginBottom: '10vh'}}>
        {step.id === 'connect' && <Connect />}
        {step.id === 'query' && <Query />}
        {step.id === 'balance' && <Balance />}
        {step.id === 'transfer' && <Transfer />}
        {step.id === 'deploy' && <Deploy />}
        {step.id === 'setter' && <Setter />}
        {step.id === 'getter' && <Getter />}
        {step.id === 'restore' && <Restore />}
        <Nav />
      </div>
    </PolygonContext.Provider>
  );
};

const WithLayoutPolygon: React.FC<AppI> = ({chain}) => {
  return Layout(Polygon, chain);
};

export default WithLayoutPolygon;
