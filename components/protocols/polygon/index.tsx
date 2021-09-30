import Nav from '@polygon/components/nav';
import Layout from 'components/shared/Layout';
import {ChainType, MarkdownForChainT, StepType} from 'types';
import {
  Connect,
  Balance,
  Query,
  Restore,
  Deploy,
  Setter,
  Getter,
  Transfer,
} from '@polygon/components/steps';

const Polygon: React.FC<{step: StepType}> = ({step}) => {
  return (
    <>
      {step.id === 'connect' && <Connect />}
      {step.id === 'query' && <Query />}
      {step.id === 'balance' && <Balance />}
      {step.id === 'transfer' && <Transfer />}
      {step.id === 'deploy' && <Deploy />}
      {step.id === 'setter' && <Setter />}
      {step.id === 'getter' && <Getter />}
      {step.id === 'restore' && <Restore />}
      <Nav />
    </>
  );
};

const WithLayoutPolygon: React.FC<{
  chain: ChainType;
  markdown: MarkdownForChainT;
}> = ({chain, markdown}) => {
  return Layout(Polygon, chain, markdown);
};

export default WithLayoutPolygon;
