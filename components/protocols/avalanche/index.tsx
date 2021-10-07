import {
  Connect,
  Account,
  Balance,
  Transfer,
  Import,
  Export,
} from '@avalanche/components/steps';
import Nav from '@avalanche/components/nav';
import Layout from 'components/shared/Layout';
import React from 'react';
import {ChainType, PROTOCOL_STEPS_ID, MarkdownForChainIdT} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';
import SetupWizard from 'components/shared/SetupWizard';

const Avalanche: React.FC = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state);

  return (
    <>
      <Nav />
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && (
        <SetupWizard showText={true} />
      )}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
      {stepId === PROTOCOL_STEPS_ID.CREATE_KEYPAIR && <Account />}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && <Transfer />}
      {stepId === PROTOCOL_STEPS_ID.EXPORT_TOKEN && <Export />}
      {stepId === PROTOCOL_STEPS_ID.IMPORT_TOKEN && <Import />}
    </>
  );
};

const WithLayoutAvalanche: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainIdT;
}> = ({chain, markdown}) => {
  return Layout(Avalanche, chain, markdown);
};

export default WithLayoutAvalanche;
