import {useEffect, useReducer} from 'react';
import {
  Connect,
  Balance,
  Getter,
  Setter,
  Account,
  Deploy,
  Transfer,
} from '@tezos/components/steps';
import {appStateReducer, initialState, TezosContext} from '@tezos/context';
import {useLocalStorage} from '@tezos/hooks';
import Nav from '@tezos/components/nav';
import {PROTOCOL_STEPS_ID, CHAINS, ChainType} from 'types';
import Layout from 'components/shared/Layout';
import {
  getChainCurrentStepId,
  getCurrentChainId,
  useGlobalState,
} from 'context';

const Tezos: React.FC = () => {
  const {state: gstate} = useGlobalState();
  const chainId = getCurrentChainId(gstate) as CHAINS;
  const stepId = getChainCurrentStepId(gstate, chainId);

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
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_KEYPAIR && <Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
    </TezosContext.Provider>
  );
};

const WithLayoutTezos: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Tezos, chain, markdown);
};

export default WithLayoutTezos;
