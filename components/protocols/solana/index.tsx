import {
  appStateReducer,
  initialState,
  SolanaContext,
  State,
} from '@solana/context';
import {Footer, Header, Sidebar} from 'components/shared/Layout';
import {useLocalStorage, useSteps} from 'hooks';
import React, {useEffect, useReducer} from 'react';
import type {AppI} from '@solana/types';
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

const SolanaApp: React.FC<AppI> = ({chain}) => {
  const {step, validate, stepIndex, validIndex, next, prev, clear} = useSteps(
    chain.steps,
  );

  return (
    <Row>
      <Sidebar chain={chain} steps={chain.steps} stepIndex={stepIndex} />
      <Col span={16} style={{padding: '60px', height: '100vh'}}>
        <Header step={step} />
        <div style={{minHeight: '250px', marginBottom: '10vh'}}>
          {step.id === 'connect' && <Connect validate={validate} />}
          {step.id === 'account' && <Keypair validate={validate} />}
          {step.id === 'fund' && <Fund validate={validate} />}
          {step.id === 'balance' && <Balance validate={validate} />}
          {step.id === 'transfer' && <Transfer validate={validate} />}
          {step.id === 'deploy' && <Deploy validate={validate} />}
          {step.id === 'greeter' && <Greeter validate={validate} />}
          {step.id === 'getter' && <Getter validate={validate} />}
          {step.id === 'setter' && <Setter validate={validate} />}
          <Nav validate={validate} index={stepIndex} clear={clear} />
        </div>
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

const Solana: React.FC<AppI> = ({chain}) => {
  const [storageState, setStorageState] = useLocalStorage<State>(
    'solana',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);
  useEffect(() => {
    setStorageState(state);
  }, [state]);
  return (
    <SolanaContext.Provider value={{state, dispatch}}>
      <SolanaApp chain={chain} />
    </SolanaContext.Provider>
  );
};

export default Solana;
