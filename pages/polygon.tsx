import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Polygon} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.POLYGON);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Polygon />
    </Layout>
  );
};

export default Protocol;
