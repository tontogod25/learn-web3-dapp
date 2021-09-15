import {Footer, Header, Sidebar} from 'components/shared/Layout';
import {Nav} from 'components/protocols/polygon/components';
import {useReducer, useEffect} from 'react';
import {useLocalStorage, useSteps} from 'hooks';
import {AppI} from '@polygon/types';
import {Row, Col} from 'antd';
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
  useAppState,
  State,
} from '@polygon/context';

const PolygonApp: React.FC<AppI> = ({chain}) => {
  const {dispatch} = useAppState();
  const {step, validate, stepIndex, validIndex, next, prev, clear} = useSteps(
    chain.steps,
  );
  useEffect(() => {
    dispatch({
      type: 'SetValidator',
      validator: validate,
    });
  }, []);

  return (
    <Row>
      <Sidebar chain={chain} steps={chain.steps} stepIndex={stepIndex} />
      <Col span={16} style={{padding: '60px', height: '100vh'}}>
        <Header step={step} />
        <div style={{minHeight: '250px', marginBottom: '10vh'}}>
          {step.id === 'connect' && <Connect />}
          {step.id === 'query' && <Query />}
          {step.id === 'restore' && <Restore />}
          {step.id === 'balance' && <Balance />}
          {step.id === 'transfer' && <Transfer />}
          {step.id === 'deploy' && <Deploy />}
          {step.id === 'setter' && <Setter />}
          {step.id === 'getter' && <Getter />}
          <Nav clear={clear} />
        </div>
        <Footer
          chainId={chain.id}
          steps={chain.steps}
          stepIndex={stepIndex}
          validIndex={validIndex}
          next={next}
          prev={prev}
        />
      </Col>
    </Row>
  );
};

const Polygon: React.FC<AppI> = ({chain}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    'polygon',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state]);
  return (
    <PolygonContext.Provider value={{state, dispatch}}>
      <PolygonApp chain={chain} />
    </PolygonContext.Provider>
  );
};

export default Polygon;
