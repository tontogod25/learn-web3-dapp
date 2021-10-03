import Layout from 'components/shared/Layout';
import {ChainType, PROTOCOL_STEPS_ID, CHAINS} from 'types';
import Nav from '@solana/components/nav';
import {
  Setup,
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
import {
  getChainCurrentStepId,
  getCurrentChainId,
  useGlobalState,
} from 'context';

const Solana: React.FC = () => {
  const {state} = useGlobalState();
  const chainId = getCurrentChainId(state) as CHAINS;
  const stepId = getChainCurrentStepId(state, chainId);

  console.log(stepId);
  return (
    <>
      {/* <Nav /> */}
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && <Setup />}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Keypair />}
      {stepId === PROTOCOL_STEPS_ID.FUND_ACCOUNT && <Fund />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.SOLANA_CREATE_GREETER && <Greeter />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
    </>
  );
};

const WithLayoutSolana: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Solana, chain, markdown);
};

export default WithLayoutSolana;
