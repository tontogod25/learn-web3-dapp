import {useEffect, useReducer} from 'react';
import {
  Connect,
  Account,
  Balance,
  Transfer,
  Estimate,
  Restore,
  Deposit,
} from '@polkadot/components/steps';
import {
  appStateReducer,
  initialState,
  PolkadotContext,
} from '@polkadot/context';
import {useLocalStorage} from '@polkadot/hooks';
import {PROTOCOL_STEPS_ID, ChainType, MarkdownForChainIdT} from 'types';
import Nav from '@polkadot/components/nav';
import Layout from 'components/shared/Layout';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Polkadot: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(global_state);

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
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Account />}
      {stepId === PROTOCOL_STEPS_ID.RESTORE_ACCOUNT && <Restore />}
      {stepId === PROTOCOL_STEPS_ID.ESTIMATE_FEES && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Estimate />}
      {stepId === PROTOCOL_STEPS_ID.ESTIMATE_DEPOSIT && <Deposit />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
    </PolkadotContext.Provider>
  );
};

const WithLayoutPolkadot: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Polkadot, chain, markdown);
};

export default WithLayoutPolkadot;
