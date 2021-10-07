import type {NextApiRequest, NextApiResponse} from 'next';
import {ManifestStepStatusesT, manifestT} from '@the-graph/types';
import fs from 'fs';
import yaml from 'js-yaml';

const START_BLOCK = 3914495;

export default async function manifest(
  _req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    let manifest = fs.readFileSync('./subgraphs/punks/subgraph.yaml', 'utf8');
    let data = yaml.load(manifest) as manifestT;

    let startBlock = data.dataSources[0].source.startBlock;
    let entities = data.dataSources[0].mapping.entities;
    let eventHandlers = data.dataSources[0].mapping.eventHandlers;

    const status: ManifestStepStatusesT = {
      block: {
        valid: true,
        message: 'Valid startBlock',
      },
      entities: {
        valid: true,
        message: 'Valid entities',
      },
      eventHandlers: {
        valid: true,
        message: 'Valid eventHandlers',
      },
    };

    if (startBlock !== START_BLOCK) {
      status.block = {
        valid: false,
        message: 'invalid startBlock',
      };
    }

    if (!entities.includes('Punk') || !entities.includes('Account')) {
      status.entities = {
        valid: false,
        message: 'Invalid entities',
      };
    }

    if (eventHandlers.length !== 1) {
      status.eventHandlers = {
        valid: false,
        message: 'Invalid eventHandlers',
      };
    }

    res.status(200).json(JSON.stringify(status));
  } catch (error) {
    res.status(500).json(error.message);
  }
}
