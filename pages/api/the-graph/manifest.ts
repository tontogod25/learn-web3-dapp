import type {NextApiRequest, NextApiResponse} from 'next';
import type {ManifestStepStatusesT} from '@the-graph/types';
import {manifestT} from '@the-graph/types';
import {defaultStatus} from '@the-graph/lib';
import yaml from 'js-yaml';
import fs from 'fs';

const START_BLOCK = 13100000;

const MANIFEST_PATH = './subgraphs/punks/subgraph.yaml';

const EVENT =
  'PunkBought(indexed uint256,uint256,indexed address,indexed address)';

const HANDLER = 'handlePunkBought';

const loadManifest = () => {
  let manifest = fs.readFileSync(MANIFEST_PATH, 'utf8');
  let data = yaml.load(manifest) as manifestT;

  let startBlock = data.dataSources[0].source.startBlock;
  let entities = data.dataSources[0].mapping.entities;
  let eventHandler = Object.values(
    data.dataSources[0].mapping.eventHandlers[0],
  );
  return {
    startBlock,
    entities,
    eventHandler,
  };
};

export default async function manifest(
  req: NextApiRequest,
  res: NextApiResponse<ManifestStepStatusesT | string>,
) {
  try {
    const status = defaultStatus;
    const {startBlock, entities, eventHandler} = loadManifest();

    if (startBlock === START_BLOCK) {
      status.block = {
        valid: true,
        message: 'Valid startBlock',
      };
    }

    if (
      entities.includes('Punk') &&
      entities.includes('Account') &&
      entities.length == 2
    ) {
      status.entities = {
        valid: true,
        message: 'Valid entities',
      };
    }

    if (eventHandler[0] === EVENT && eventHandler[1] === HANDLER) {
      status.eventHandlers = {
        valid: true,
        message: 'Valid eventHandlers',
      };
    }

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
