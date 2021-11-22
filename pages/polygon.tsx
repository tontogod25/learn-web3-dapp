import {CHAINS, ChainPropT} from 'types';
import WithLayoutPolygon from 'components/protocols/polygon';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.POLYGON);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutPolygon chain={chain} markdown={markdown} />
    </>
  );
}
