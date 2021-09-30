import {ChainType, MarkdownForChainT, StepType} from 'types';
import React, {useEffect, useReducer} from 'react';
import {useLocalStorage} from 'hooks';
import Sidebar from './Sidebar';
import {Row, Col} from 'antd';
import Nav from './Nav';
import {
  GlobalContext,
  globalStateReducer,
  initialGlobalState,
  GlobalState,
} from 'context';
import {GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import styled from 'styled-components';
import Footer from './Footer';

const Layout = (
  Protocol: React.FC<{step: StepType}>,
  chain: ChainType,
  markdown: MarkdownForChainT,
) => {
  const storageKey = chain.id + '-nav';
  const [storageState, setStorageState] = useLocalStorage<GlobalState>(
    storageKey,
    initialGlobalState,
  );
  const [state, dispatch] = useReducer(globalStateReducer, storageState);

  useEffect(() => {
    dispatch({
      type: 'SetChainId',
      chainId: chain.id,
    });
  }, []);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  const step = chain.steps[state.currentStepIndex];
  const prevStep =
    state.currentStepIndex - 1 >= 0
      ? chain.steps[state.currentStepIndex - 1]
      : null;
  const nextStep =
    state.currentStepIndex < chain.steps.length - 1
      ? chain.steps[state.currentStepIndex + 1]
      : null;

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <Col>
        <Nav chain={chain} />
        <BelowNav>
          <Sidebar step={step} steps={chain.steps} markdown={markdown} />
          <Col span={GRID_LAYOUT[1]} style={{padding: '120px 60px 60px 60px'}}>
            <Protocol step={step} />
          </Col>
        </BelowNav>
        <Footer
          step={step}
          steps={chain.steps}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      </Col>
    </GlobalContext.Provider>
  );
};

const BelowNav = styled(Row)`
  margin-top: ${HEADER_HEIGHT}px;
  position: fixed;
`;

export default Layout;
