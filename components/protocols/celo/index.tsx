import {useEffect, useReducer} from 'react';
import {
  Connect,
  Account,
  Balance,
  Transfer,
  Swap,
  Deploy,
  Getter,
  Setter,
} from '@celo/components/steps';
import {appStateReducer, initialState, CeloContext} from '@celo/context';
import {useLocalStorage} from '@celo/hooks';
import {PROTOCOL_STEPS_ID, CHAINS, ChainType} from 'types';
import Layout from 'components/shared/Layout';
import Nav from './components/nav';
import {
  getChainCurrentStepId,
  getCurrentChainId,
  useGlobalState,
} from 'context';

const Celo: React.FC = () => {
  const {state: gstate} = useGlobalState();
  const chainId = getCurrentChainId(gstate) as CHAINS;
  const stepId = getChainCurrentStepId(gstate, chainId);

  const [storageState, setStorageState] = useLocalStorage('celo', initialState);
  const [state, dispatch] = useReducer(appStateReducer, storageState);

  useEffect(() => {
    setStorageState(state);
  }, [state]);

  return (
    <CeloContext.Provider value={{state, dispatch}}>
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.SWAP_TOKEN && <Swap />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
      <Nav />
    </CeloContext.Provider>
  );
};

const WithLayoutCelo: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Celo, chain, markdown);
};

export default WithLayoutCelo;
