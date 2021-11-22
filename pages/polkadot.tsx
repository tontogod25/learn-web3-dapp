import {CHAINS, ChainPropT} from 'types';
import WithLayoutPolkadot from 'components/protocols/polkadot';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.POLKADOT);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutPolkadot chain={chain} markdown={markdown} />
    </>
  );
}
