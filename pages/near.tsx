import {getStaticPropsForChain} from 'utils/pages';
import {CHAINS, ChainPropT} from 'types';
import Layout from 'components/shared/Layout';
import {Near} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.NEAR);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Near />
    </Layout>
  );
};

export default Protocol;
