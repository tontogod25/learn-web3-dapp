import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Polkadot} from 'components/protocols';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.POLKADOT);
}

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  return (
    <Layout markdown={markdown} chain={chain}>
      <Polkadot />
    </Layout>
  );
};

export default Protocol;
