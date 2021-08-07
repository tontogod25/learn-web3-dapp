import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect } from '@ccelo/components/steps';
import { appStateReducer, initialState, CeloContext } from '@ccelo/context'
import { useAppState, useLocalStorage } from '@ccelo/hooks'
import { Sidebar, Step } from '@ccelo/components/layout'
import { Nav } from '@ccelo/components';
import type { AppI } from '@ccelo/types';

const CeloApp: React.FC<AppI> = ({ chain }) => {
    const { state, dispatch } = useAppState();
    const { steps } = chain
    const step = steps[state.index];
    const nextHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index + 1
        })
    }
    const prevHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index - 1
        })
    }
    const isFirstStep = state.index == 0;
    const isLastStep = state.index === steps.length - 1;

    return (
        <Row>
        <Sidebar
            steps={steps}
            stepIndex={state.index}
        />
        <Step
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            prev={prevHandler}
            next={nextHandler}
            body={
            <>
                { step.id === "connect"  && <Connect /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Celo: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("celo", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <CeloContext.Provider value={{ state, dispatch }}>
          <CeloApp chain={chain} />
      </CeloContext.Provider>
  )
}

export default Celo
