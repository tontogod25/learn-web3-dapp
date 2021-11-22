import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Avalanche} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.AVALANCHE);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Avalanche />
    </Layout>
  );
};

export default Protocol;
