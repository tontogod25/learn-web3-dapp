import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Tezos} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.TEZOS);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Tezos />
    </Layout>
  );
};

export default Protocol;
