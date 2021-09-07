import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect, Account, Fund, Balance, Transfer, Deploy, Greeter, GetGreeting, CallGreeting } from '@solana/components/steps';
import { appStateReducer, initialState, SolanaContext } from '@solana/context'
import { useAppState, useLocalStorage } from '@solana/hooks'
import { Sidebar, Step } from '@solana/components/layout'
import { Nav } from '@solana/components';
import type {AppI} from '@solana/types';
import {trackTutorialStepViewed} from "../../../utils/tracking-utils";

const SolanaApp: React.FC<AppI> = ({ chain }) => {
    const { state, dispatch } = useAppState();
    const { steps } = chain
    const step = steps[state.index];

    const nextHandler = () => {
        const index = state.index + 1;
        dispatch({
            type: 'SetIndex',
            index,
        })
        trackTutorialStepViewed(chain.id, steps[index].title, 'next');
    }
    const prevHandler = () => {
        const index = state.index - 1;
        dispatch({
            type: 'SetIndex',
            index,
        })
        trackTutorialStepViewed(chain.id, steps[index].title, 'prev');
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
                { step.id === "connect" && <Connect /> }
                { step.id === "account" && <Account /> }
                { step.id === "fund"    && <Fund /> }
                { step.id === "balance" && <Balance /> }
                { step.id === "transfer" && <Transfer /> }
                { step.id === "deploy" && <Deploy /> }
                { step.id === "greeter" && <Greeter /> }
                { step.id === "getter" && <GetGreeting /> }
                { step.id === "setter" && <CallGreeting /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Solana: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("solana", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <SolanaContext.Provider value={{ state, dispatch }}>
          <SolanaApp chain={chain} />
      </SolanaContext.Provider>
  )
}

export default Solana
