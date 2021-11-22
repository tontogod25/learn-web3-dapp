import {CHAINS, ChainPropT} from 'types';
import WithLayoutAvalanche from 'components/protocols/avalanche';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.AVALANCHE);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutAvalanche chain={chain} markdown={markdown} />
    </>
  );
}
