import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect, Account, Query, Transfer_X } from '@avalanche/components/steps';
import { appStateReducer, initialState, AvalancheContext } from '@avalanche/context'
import { useAppState, useLocalStorage } from '@avalanche/hooks'
import { Sidebar, Step } from '@avalanche/components/layout'
import { Nav } from '@avalanche/components';
import type { AppI } from '@avalanche/types';

const AvalanceApp: React.FC<AppI> = ({ chain }) => {
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
                { step.id === "account"  && <Account /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Avalance: React.FC<AppI> = ({ chain }) => {
	console.log(chain)
  const [storageState, setStorageState] = useLocalStorage("avalanche", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <AvalancheContext.Provider value={{ state, dispatch }}>
          <AvalanceApp chain={chain} />
      </AvalancheContext.Provider>
  )
}

export default Avalance
