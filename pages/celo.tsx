import {CHAINS, ChainPropT} from 'types';
import {Celo} from 'components/protocols';
import Layout from 'components/shared/Layout';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.CELO);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Celo />
    </Layout>
  );
};

export default Protocol;
