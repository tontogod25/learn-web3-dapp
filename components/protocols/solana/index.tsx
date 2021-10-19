import Layout from 'components/shared/Layout';
import {ChainType, PROTOCOL_STEPS_ID, MarkdownForChainIdT} from 'types';
import Nav from '@figment-solana/components/nav';
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
} from '@figment-solana/components/steps';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import SetupWizard from 'components/shared/SetupWizard';

const Solana: React.FC = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state);

  return (
    <div>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && (
        <SetupWizard showText={true} />
      )}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && <Keypair />}
      {stepId === PROTOCOL_STEPS_ID.FUND_ACCOUNT && <Fund />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.DEPLOY_CONTRACT && <Deploy />}
      {stepId === PROTOCOL_STEPS_ID.SOLANA_CREATE_GREETER && <Greeter />}
      {stepId === PROTOCOL_STEPS_ID.GET_CONTRACT_VALUE && <Getter />}
      {stepId === PROTOCOL_STEPS_ID.SET_CONTRACT_VALUE && <Setter />}
    </div>
  );
};

const WithLayoutSolana: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Solana, chain, markdown);
};

export default WithLayoutSolana;
