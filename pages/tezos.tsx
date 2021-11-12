import {CHAINS, ChainPropT} from 'types';
import WithLayoutTezos from 'components/protocols/tezos';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.TEZOS);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutTezos chain={chain} markdown={markdown} />
    </>
  );
}
