import {MarkdownForChainIdT, PROTOCOL_STEPS_ID, CHAINS} from 'types';
import {CHAINS_CONFIG} from 'lib/constants';
import path from 'path';
import fs from 'fs';

const MARKDOWN_PATH = path.resolve('markdown');

export function fetchMarkdownForChainId(chainId: CHAINS): MarkdownForChainIdT {
  const steps = CHAINS_CONFIG[chainId].steps.map((step) => step.id);

  return steps.reduce((markdownMap, stepId) => {
    const filePath = path.join(MARKDOWN_PATH, chainId, `${stepId}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const markdown = fileContent.toString();
    markdownMap[stepId as PROTOCOL_STEPS_ID] = markdown;
    return markdownMap;
  }, {} as MarkdownForChainIdT);
}
