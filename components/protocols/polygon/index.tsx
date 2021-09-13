import {Footer, Header, Sidebar} from 'components/shared/Layout';
import {trackTutorialStepViewed} from '@funnel/tracking-utils';
import {Nav} from 'components/protocols/polygon/components';
import {useReducer, useEffect} from 'react';
import {useLocalStorage} from 'hooks';
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

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const PolygonApp: React.FC<AppI> = ({chain}) => {
  const {state, dispatch} = useAppState();
  const {steps} = chain;
  const step = steps[state.index];

  const nextHandler = () => {
    const index = state.index + 1;
    dispatch({
      type: 'SetIndex',
      index,
    });
    trackTutorialStepViewed(chain.id, steps[index].title, 'next');
  };
  const prevHandler = () => {
    const index = state.index - 1;
    dispatch({
      type: 'SetIndex',
      index,
    });
    trackTutorialStepViewed(chain.id, steps[index].title, 'prev');
  };

  return (
    <Row>
      <Sidebar chain={chain} steps={chain.steps} stepIndex={state.index} />
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
          <Nav />
        </div>
        <Footer
          chainId={chain.id}
          steps={chain.steps}
          stepIndex={state.index}
          validIndex={state.validate}
          next={nextHandler}
          prev={prevHandler}
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
