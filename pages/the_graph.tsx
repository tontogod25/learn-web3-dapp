import {CHAINS, ChainPropT} from 'types';
import WithLayoutTheGraph from 'components/protocols/the_graph';
import Head from 'components/shared/Layout/Head';
import {getStaticPropsForChain} from 'utils/pages';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.THE_GRAPH);
}

export default function ({chain, markdown}: ChainPropT) {
  return (
    <>
      <Head chain={chain} />
      <WithLayoutTheGraph chain={chain} markdown={markdown} />
    </>
  );
}
