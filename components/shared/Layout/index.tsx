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
import {setActionSetStepStatusFromChainId} from 'utils';

const Layout = (
  Protocol: React.FC<{step: StepType}>,
  chain: ChainType,
  markdown: MarkdownForChainT,
) => {
  const [storageState, setStorageState] = useLocalStorage<GlobalState>(
    'figment',
    initialGlobalState,
  );
  const [state, dispatch] = useReducer(globalStateReducer, storageState);

  useEffect(() => {
    dispatch({
      type: 'SetChainId',
      chainId: chain.id,
    });
    if (!state[chain.id]?.stepsStatus) {
      const stepsStatus = JSON.stringify(
        chain.steps.map((step) => [step.id, false]),
      );
      // @ts-ignore
      dispatch(setActionSetStepStatusFromChainId(chain.id, stepsStatus));
    } else {
      const status = JSON.parse(state[chain.id]?.stepsStatus as string);
      const currentIndex = status.filter((valid: any) => valid[1]).length;
      console.log(currentIndex);
      dispatch({
        type: 'SetCurrentStepIndex',
        currentStepIndex: currentIndex,
      });
    }
  }, []);

  useEffect(() => {
    setStorageState(state);
  }, [state, dispatch]);

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
          chainId={chain.id}
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
