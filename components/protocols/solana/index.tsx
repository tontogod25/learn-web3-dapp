import Layout from 'components/shared/Layout';
import {ChainType, PROTOCOL_STEPS_ID, MarkdownForChainIdT} from 'types';
import Nav from '@solana/components/nav';
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
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Solana: React.FC = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state);

  return (
    <>
      <Nav />
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

const WithLayoutSolana: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Solana, chain, markdown);
};

export default WithLayoutSolana;
