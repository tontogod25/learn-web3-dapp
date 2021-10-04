import {
  Connect,
  Account,
  Balance,
  Transfer,
  Import,
  Export,
  SetUp,
} from '@avalanche/components/steps';
// import Nav from '@avalanche/components/nav';
import Layout from 'components/shared/Layout';
import React from 'react';
import {ChainType, PROTOCOL_STEPS_ID, MarkdownForChainIdT} from 'types';
import {getCurrentStepIdForCurrentChain, useGlobalState} from 'context';

const Avalanche: React.FC = () => {
  const {state} = useGlobalState();
  const stepId = getCurrentStepIdForCurrentChain(state);

  return (
    <>
      {/* <Nav /> */}
      {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && <SetUp stepId={stepId} />}
      {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && (
        <Connect stepId={stepId} />
      )}
      {stepId === PROTOCOL_STEPS_ID.CREATE_ACCOUNT && (
        <Account stepId={stepId} />
      )}
      {stepId === PROTOCOL_STEPS_ID.GET_BALANCE && <Balance stepId={stepId} />}
      {stepId === PROTOCOL_STEPS_ID.TRANSFER_TOKEN && (
        <Transfer stepId={stepId} />
      )}
      {stepId === PROTOCOL_STEPS_ID.EXPORT_TOKEN && <Export stepId={stepId} />}
      {stepId === PROTOCOL_STEPS_ID.IMPORT_TOKEN && <Import stepId={stepId} />}
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
