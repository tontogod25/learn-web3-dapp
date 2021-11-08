import Layout from 'components/shared/Layout';
import {ChainType, PROTOCOL_STEPS_ID, MarkdownForChainIdT} from 'types';
import {accountExplorer} from '@figment-solana/lib';
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
} from '@figment-solana/components';
import {useGlobalState} from 'context';
import {getInnerState, getStepId} from 'utils/context';
import ProtocolNav from 'components/shared/ProtocolNav/ProtocolNav';

const Solana: React.FC = () => {
  const {state} = useGlobalState();
  const {address, network} = getInnerState(state);
  const stepId = getStepId(state);

  return (
    <>
      <ProtocolNav
        address={address}
        network={network}
        accountExplorer={accountExplorer(network)}
      />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP}
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
