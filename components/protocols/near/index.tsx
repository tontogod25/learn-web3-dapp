import {
  Connect,
  Keys,
  Account,
  Balance,
  Transfer,
  Deploy,
  Getter,
  Setter,
} from '@near/components/steps';
import Nav from '@near/components/nav';
import {ChainType, StepType} from 'types';
import Layout from 'components/shared/Layout';

const Near: React.FC<{step: StepType}> = ({step}) => {
  return (
    <>
      {step.id === 'connect' && <Connect />}
      {step.id === 'keypair' && <Keys />}
      {step.id === 'account' && <Account />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
      <Nav />
    </>
  );
};

const WithLayoutNear: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Near, chain, markdown);
};

export default WithLayoutNear;
