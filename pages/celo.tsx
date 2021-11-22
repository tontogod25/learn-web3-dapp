import {CHAINS, ChainPropT} from 'types';
import WithLayoutCelo from 'components/protocols/celo';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.CELO);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutCelo chain={chain} markdown={markdown} />
    </>
  );
}
