import {useEffect, useReducer} from 'react';
import {
  Connect,
  Balance,
  Getter,
  Setter,
  Account,
  Deploy,
  Transfer,
} from '@figment-tezos/components/steps';
import {
  appStateReducer,
  initialState,
  TezosContext,
} from '@figment-tezos/context';
import {useLocalStorage} from '@figment-tezos/hooks';
import Nav from '@figment-tezos/components/nav';
import {PROTOCOL_STEPS_ID, ChainType, MarkdownForChainIdT} from 'types';
import Layout from 'components/shared/Layout';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import SetupWizard from 'components/shared/SetupWizard';

const Tezos: React.FC = () => {
  const {state: global_state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(global_state);

  const [storageState, setStorageState] = useLocalStorage(
    'tezos',
    initialState,
  );
  const [state, dispatch] = useReducer(appStateReducer, storageState);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  return (
    <TezosContext.Provider value={{state, dispatch}}>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
    </TezosContext.Provider>
  );
};

const WithLayoutTezos: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Tezos, chain, markdown);
};

export default WithLayoutTezos;
