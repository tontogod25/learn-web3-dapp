import type {NextApiRequest, NextApiResponse} from 'next';
import {manifestT} from '@the-graph/types';
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

    console.log('startBlock', startBlock);
    console.log('entities', entities);
    console.log('eventHandlers', eventHandlers);

    const errors = {
      block: '',
      entities: '',
      eventHandlers: '',
    };

    if (startBlock !== START_BLOCK) {
      errors.block = 'Invalid Start Block';
    }

    if (!entities.includes('Punk') || !entities.includes('Account')) {
      errors.entities = 'Invalid entities';
    }

    if (eventHandlers.length !== 1) {
      errors.eventHandlers = 'Invalid eventHandlers';
    }

    if (Object.values(errors).some((el) => el !== '')) {
      res.status(500).json(JSON.stringify(errors));
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}
