import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Secret} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.SECRET);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Secret />
    </Layout>
  );
};

export default Protocol;
