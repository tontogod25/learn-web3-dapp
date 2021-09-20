import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import {useEffect, useReducer} from 'react';
import {ChainType, StepType} from 'types';
import {useLocalStorage} from 'hooks';
import {Row, Col} from 'antd';
import {
  GlobalContext,
  globalStateReducer,
  initialGlobalState,
  GlobalState,
} from 'context';

const Layout = (Protocol: React.FC<{step: StepType}>, chain: ChainType) => {
  const storageKey = chain.id + '-nav';
  const [storageState, setStorageState] = useLocalStorage<GlobalState>(
    storageKey,
    initialGlobalState,
  );
  const [state, dispatch] = useReducer(globalStateReducer, storageState);

  useEffect(() => {
    dispatch({
      type: 'SetChain',
      chain: chain.id,
    });
  }, []);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  const step = chain.steps[state.index];

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <Row>
        <Sidebar steps={chain.steps} label={chain.label} />
        <Col span={16} style={{padding: '60px', height: '100vh'}}>
          <Header title={step.title} url={step.url} />
          <Protocol step={step} />
          <Footer steps={chain.steps} />
        </Col>
      </Row>
    </GlobalContext.Provider>
  );
};

export default Layout;
