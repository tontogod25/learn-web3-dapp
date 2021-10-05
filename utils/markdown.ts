import {MarkdownForChainIdT, PROTOCOL_STEPS_ID, CHAINS} from 'types';
import markdownURLs from 'lib/markdownURLs';
import path from 'path';
import fs from 'fs';

const MARKDOWN_PATH = path.resolve('md');

export function fetchMarkdownForChainId(chainId: CHAINS): MarkdownForChainIdT {
  const steps = markdownURLs[chainId];

  return Object.keys(steps).reduce((markdownMap, stepId) => {
    const filePath = path.join(MARKDOWN_PATH, chainId, `${stepId}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const markdown = fileContent.toString();
    markdownMap[stepId as PROTOCOL_STEPS_ID] = markdown;
    return markdownMap;
  }, {} as MarkdownForChainIdT);
}
