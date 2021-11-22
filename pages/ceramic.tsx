import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Ceramic} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.CERAMIC);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Ceramic />
    </Layout>
  );
};

export default Protocol;
