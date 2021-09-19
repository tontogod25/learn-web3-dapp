import {
  appStateReducer,
  initialState,
  SolanaContext,
  State,
  useAppState,
} from '@solana/context';
import {Footer, Header, Sidebar} from 'components/shared/Layout';
import {useLocalStorage, useSteps, initialHookState} from 'hooks';
import React, {useEffect, useReducer} from 'react';
import type {AppI} from '@solana/types';
import {StepType, HooksState} from 'types';
import {Nav} from '@solana/components';
import {Row, Col} from 'antd';
import {
  Connect,
  Keypair,
  Fund,
  Balance,
  Transfer,
  Deploy,
  Greeter,
  Getter,
  Setter,
} from '@solana/components/steps';

const SolanaApp: React.FC<{
  clear(chain: string): void;
  validate(n: number): void;
  step: StepType;
  index: number;
}> = ({clear, validate, step, index}) => {
  const {dispatch} = useAppState();

  useEffect(() => {
    dispatch({
      type: 'SetValidator',
      validator: validate,
    });
  }, [validate]);

  return (
    <div style={{minHeight: '250px', marginBottom: '10vh'}}>
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Keypair />}
      {step.id === 'fund' && <Fund />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'greeter' && <Greeter />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
      <Nav clear={clear} index={index} />
    </div>
  );
};

const Solana: React.FC<{
  chainId: string;
  clear(chain: string): void;
  validate(n: number): void;
  step: StepType;
  index: number;
}> = ({chainId, clear, validate, step, index}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    chainId,
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state]);
  return (
    <SolanaContext.Provider value={{state, dispatch}}>
      <SolanaApp clear={clear} validate={validate} step={step} index={index} />
    </SolanaContext.Provider>
  );
};

const WrappedSolana: React.FC<AppI> = ({chain}) => {
  const storageKey = chain.id + '-nav';
  const [storageState, setStorageState] = useLocalStorage<HooksState>(
    storageKey,
    initialHookState,
  );
  const {validIndex, stepIndex, next, prev, step, clear, validate} = useSteps(
    chain.steps,
    storageState,
  );

  useEffect(() => {
    setStorageState({stepIndex, validIndex});
  }, [stepIndex, validIndex]);

  return (
    <Row>
      <Sidebar chain={chain} steps={chain.steps} stepIndex={stepIndex} />
      <Col span={16} style={{padding: '60px', height: '100vh'}}>
        <Header step={step} />
        <Solana
          chainId={chain.id}
          clear={clear}
          validate={validate}
          step={step}
          index={stepIndex}
        />
        <Footer
          chainId={chain.id}
          steps={chain.steps}
          stepIndex={stepIndex}
          validIndex={validIndex}
          next={next}
          prev={prev}
        />
      </Col>
    </Row>
  );
};

export default WrappedSolana;
