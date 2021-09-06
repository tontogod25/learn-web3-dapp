import { useEffect, useReducer } from "react";
import { Row } from 'antd';
import { Connect, Account, Balance, Transfer, Deploy, Getter, Setter } from '@secret/components/steps';
import { appStateReducer, initialState, SecretContext } from '@secret/context'
import { useAppState, useLocalStorage } from '@secret/hooks'
import { Sidebar, Step } from '@secret/components/layout'
import { Nav } from '@secret/components';
import type { AppI } from '@secret/types';
import {trackTutorialStepViewed} from "../../../utils/tracking-utils";

const SecretApp: React.FC<AppI> = ({ chain }) => {
    const { state, dispatch } = useAppState();
    const { steps } = chain
    const step = steps[state.index];
    const nextHandler = () => {
        const index = state.index + 1;
        dispatch({
            type: 'SetIndex',
            index
        })
        trackTutorialStepViewed(chain.id, steps[index].title, 'next');
    }
    const prevHandler = () => {
        const index = state.index - 1;
        dispatch({
            type: 'SetIndex',
            index
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
                    { step.id === "connect"  && <Connect />  }
                    { step.id === "account"  && <Account />  }
                    { step.id === "balance"  && <Balance />  }
                    { step.id === "transfer" && <Transfer /> }
                    { step.id === "deploy"   && <Deploy />   }
                    { step.id === "getter"   && <Getter />   }
                    { step.id === "setter"   && <Setter />   }
                </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Secret: React.FC<AppI> = ({ chain }) => {
  const [storageState, setStorageState] = useLocalStorage("secret", initialState)
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
      setStorageState(state)
  }, [state])
  return (
      <SecretContext.Provider value={{ state, dispatch }}>
          <SecretApp chain={chain} />
      </SecretContext.Provider>
  )
}

export default Secret
