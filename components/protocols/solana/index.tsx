import {
  appStateReducer,
  initialState,
  SolanaContext,
  useAppState,
  State,
} from '@solana/context';
import {Footer, Header, Sidebar} from 'components/shared/Layout';
import {trackTutorialStepViewed} from '@funnel/tracking-utils';
import {useEffect, useReducer} from 'react';
import type {AppI} from '@solana/types';
import {Nav} from '@solana/components';
import {useLocalStorage} from 'hooks';
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

  return (
    <Row>
      <Sidebar chain={chain} steps={chain.steps} stepIndex={state.index} />
      <Col span={16} style={{padding: '60px', height: '100vh'}}>
        <Header step={step} />
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
          <Nav />
        </div>
        <Footer
          chainId={chain.id}
          steps={chain.steps}
          stepIndex={state.index}
          validIndex={state.validate}
          next={nextHandler}
          prev={prevHandler}
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
