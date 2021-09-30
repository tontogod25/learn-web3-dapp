import Layout from 'components/shared/Layout';
import {StepType, ChainType} from 'types';
import Nav from '@solana/components/nav';
import {
  SetUp,
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

const Solana: React.FC<{step: StepType}> = ({step}) => {
  return (
    <>
      {step.id === 'setup' && <SetUp stepId={step.id} />}
      {step.id === 'connect' && <Connect stepId={step.id} />}
      {step.id === 'account' && <Keypair stepId={step.id} />}
      {step.id === 'fund' && <Fund stepId={step.id} />}
      {step.id === 'balance' && <Balance stepId={step.id} />}
      {step.id === 'transfer' && <Transfer stepId={step.id} />}
      {step.id === 'deploy' && <Deploy stepId={step.id} />}
      {step.id === 'greeter' && <Greeter stepId={step.id} />}
      {step.id === 'getter' && <Getter stepId={step.id} />}
      {step.id === 'setter' && <Setter stepId={step.id} />}
      <Nav />
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
