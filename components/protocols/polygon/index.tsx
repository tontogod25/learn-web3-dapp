import WrappedProtocol from 'components/shared/WrappedProtocol';
import {Nav} from 'components/protocols/polygon/components';
import {useReducer, useEffect} from 'react';
import {useLocalStorage} from 'hooks';
import {AppI} from '@polygon/types';
import {ProtocolI} from 'types';
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

const Polygon: React.FC<ProtocolI> = ({chainId, clear, validate, step}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    chainId,
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state, step]);

  useEffect(() => {
    dispatch({
      type: 'SetValidator',
      validator: validate,
    });
  }, [validate]);

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
        <Nav clear={clear} />
      </div>
    </PolygonContext.Provider>
  );
};

const WrappedPolygon: React.FC<AppI> = ({chain}) => {
  return WrappedProtocol(Polygon, chain);
};

export default WrappedPolygon;
