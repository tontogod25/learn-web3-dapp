import fs from 'fs';
import markdownURLs from 'lib/markdownURLs';
import {MarkdownForChainT} from 'types';

export function markdownFetch(chainId: string): MarkdownForChainT {
  // @ts-ignore
  const stepsObj = markdownURLs[chainId];

  return Object.keys(stepsObj).reduce((acc, stepId) => {
    const data = fs.readFileSync(`md/${chainId}/${stepId}.md`);
    const stepMd = data.toString();
    // @ts-ignore
    acc[stepId] = stepMd;
    return acc;
  }, {});
}
