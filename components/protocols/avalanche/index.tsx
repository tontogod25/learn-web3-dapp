import {
  Connect,
  Account,
  Balance,
  Transfer,
  Import,
  Export,
  SetUp,
} from '@avalanche/components/steps';
import Nav from '@avalanche/components/nav';
import Layout from 'components/shared/Layout';
import React from 'react';
import {StepType, ChainType} from 'types';

const Avalanche: React.FC<{step: StepType}> = ({step}) => {
  return (
    <>
      {step.id === 'setup' && <SetUp stepId={step.id} />}
      {step.id === 'connect' && <Connect stepId={step.id} />}
      {step.id === 'account' && <Account stepId={step.id} />}
      {step.id === 'balance' && <Balance stepId={step.id} />}
      {step.id === 'transfer' && <Transfer stepId={step.id} />}
      {step.id === 'export' && <Export stepId={step.id} />}
      {step.id === 'import' && <Import stepId={step.id} />}
      <Nav />
    </>
  );
};

const WithLayoutAvalanche: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Avalanche, chain, markdown);
};

export default WithLayoutAvalanche;
