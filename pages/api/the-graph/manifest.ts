import type {NextApiRequest, NextApiResponse} from 'next';
import type {ManifestStepStatusesT} from '@the-graph/types';
import {manifestT} from '@the-graph/types';
import fs from 'fs';
import yaml from 'js-yaml';

const START_BLOCK = 3914495;

const MANIFEST_PATH = './subgraphs/punks/subgraph.yaml';

const loadManifest = () => {
  let manifest = fs.readFileSync(MANIFEST_PATH, 'utf8');
  let data = yaml.load(manifest) as manifestT;

  let startBlock = data.dataSources[0].source.startBlock;
  let entities = data.dataSources[0].mapping.entities;
  let eventHandlers = Object.values(
    data.dataSources[0].mapping.eventHandlers[0],
  );
  return {
    startBlock,
    entities,
    eventHandlers,
  };
};

export default async function manifest(
  req: NextApiRequest,
  res: NextApiResponse<ManifestStepStatusesT | string>,
) {
  try {
    const status = req.body.status as ManifestStepStatusesT;
    const {startBlock, entities, eventHandlers} = loadManifest();

    if (startBlock === START_BLOCK) {
      status.block = {
        valid: true,
        message: 'Valid startBlock',
      };
    }

    if (entities.includes('Punk') && entities.includes('Account')) {
      status.entities = {
        valid: true,
        message: 'Valid entities',
      };
    }

    if (eventHandlers.length === 2) {
      status.eventHandlers = {
        valid: true,
        message: 'Valid eventHandlers',
      };
    }

    res.status(200).json(status);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}
