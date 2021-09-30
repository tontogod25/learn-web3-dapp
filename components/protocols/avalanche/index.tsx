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
import {StepType, ChainType} from 'types';

const Avalanche: React.FC<{step: StepType}> = ({step}) => {
  return (
    <>
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'export' && <Export />}
      {step.id === 'import' && <Import />}
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
