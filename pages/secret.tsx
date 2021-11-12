import {CHAINS, ChainPropT} from 'types';
import WithLayoutSecret from 'components/protocols/secret';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.SECRET);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutSecret chain={chain} markdown={markdown} />
    </>
  );
}
