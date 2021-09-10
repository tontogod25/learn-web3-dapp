import {
  Connect,
  Account,
  Balance,
  Transfer,
  Estimate,
  Restore,
  Deposit,
} from '@polka/components/steps';
import {appStateReducer, initialState, PolkadotContext} from '@polka/context';
import {useAppState, useLocalStorage} from '@polka/hooks';
import {Sidebar, Step} from '@polka/components/layout';
import {useEffect, useReducer} from 'react';
import type {AppI} from '@polka/types';
import {Nav} from '@polka/components';
import {Row} from 'antd';
import {trackTutorialStepViewed} from '../../../utils/tracking-utils';

const PolkadotApp: React.FC<AppI> = ({chain}) => {
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
  const isFirstStep = state.index == 0;
  const isLastStep = state.index === steps.length - 1;

  return (
    <Row>
      <Sidebar steps={steps} stepIndex={state.index} />
      <Step
        step={step}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        prev={prevHandler}
        next={nextHandler}
        body={
          <>
            {step.id === 'connect' && <Connect />}
            {step.id === 'account' && <Account />}
            {step.id === 'restore' && <Restore />}
            {step.id === 'balance' && <Balance />}
            {step.id === 'estimate' && <Estimate />}
            {step.id === 'deposit' && <Deposit />}
            {step.id === 'transfer' && <Transfer />}
          </>
        }
        nav={<Nav />}
      />
    </Row>
  );
};

const Polkadot: React.FC<AppI> = ({chain}) => {
  const [storageState, setStorageState] = useLocalStorage(
    'polkadot',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state]);
  return (
    <PolkadotContext.Provider value={{state, dispatch}}>
      <PolkadotApp chain={chain} />
    </PolkadotContext.Provider>
  );
};

export default Polkadot;
