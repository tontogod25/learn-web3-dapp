import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Solana} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.SOLANA);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Solana />
    </Layout>
  );
};

export default Protocol;
