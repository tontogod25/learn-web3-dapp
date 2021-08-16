import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect, Account, Balance, Transfer, Estimate, Restore } from '@polka/components/steps';
import { appStateReducer, initialState, PolkadotContext } from '@polka/context'
import { useAppState, useLocalStorage } from '@polka/hooks'
import { Sidebar, Step } from '@polka/components/layout'
import { Nav } from '@polka/components';
import type { AppI } from '@polka/types';

const PolkadotApp: React.FC<AppI> = ({ chain }) => {
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
                { step.id === "restore"  && <Restore /> }
                { step.id === "balance"  && <Balance /> }
                { step.id === "transfer" && <Transfer /> }
                { step.id === "estimate" && <Estimate /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Polkadot: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("polkadot", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <PolkadotContext.Provider value={{ state, dispatch }}>
          <PolkadotApp chain={chain} />
      </PolkadotContext.Provider>
  )
}

export default Polkadot
