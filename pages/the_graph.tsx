import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {TheGraph} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.THE_GRAPH);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <TheGraph />
    </Layout>
  );
};

export default Protocol;
