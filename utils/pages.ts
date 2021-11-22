import {CHAINS_CONFIG} from 'lib/constants';
import {ChainPropT, CHAINS} from 'types';
import {fetchMarkdownForChainId} from './markdown';

export function getStaticPropsForChain(chain: CHAINS): {props: ChainPropT} {
  return {
    props: {
      chain: CHAINS_CONFIG[chain],
      markdown: fetchMarkdownForChainId(chain),
    },
  };
}
