import {CHAINS, ChainPropT} from 'types';
import WithLayoutCeramic from 'components/protocols/ceramic';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.CERAMIC);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutCeramic chain={chain} markdown={markdown} />
    </>
  );
}
