import {CHAINS, ChainPropT} from 'types';
import WithLayoutNear from 'components/protocols/near';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.NEAR);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutNear chain={chain} markdown={markdown} />
    </>
  );
}
