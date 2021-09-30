import Layout from 'components/shared/Layout';
import {StepType, ChainType} from 'types';
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

const Solana: React.FC<{step: StepType}> = ({step}) => {
  return (
    <>
      {step.id === 'connect' && <Connect />}
      {step.id === 'account' && <Keypair />}
      {step.id === 'fund' && <Fund />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'greeter' && <Greeter />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'setter' && <Setter />}
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
