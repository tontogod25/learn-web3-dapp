import {CHAINS, ChainPropT} from 'types';
import WithLayoutSolana from 'components/protocols/solana';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.SOLANA);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutSolana chain={chain} markdown={markdown} />
    </>
  );
}
