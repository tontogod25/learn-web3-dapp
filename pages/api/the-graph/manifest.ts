import type {NextApiRequest, NextApiResponse} from 'next';
import {manifestT} from '@the-graph/types';
import fs from 'fs';
import yaml from 'js-yaml';

export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    let manifest = fs.readFileSync('./subgraph/punks01/subgraph.yaml', 'utf8');
    let data = yaml.load(manifest) as manifestT;

    let startBlock = data.dataSources[0].source.startBlock;
    let entities = data.dataSources[0].mapping.entities;
    let eventHandlers = data.dataSources[0].mapping.eventHandlers;

    console.log(startBlock);
    console.log(entities);
    console.log(eventHandlers);

    if (startBlock != 3914495) {
      throw new Error('Invalid Start Block');
    }

    if (!entities.includes('Punk') || !entities.includes('Account')) {
      throw new Error('Invalid entities');
    }

    if (eventHandlers[0].handler !== 'handleAssign') {
      throw new Error('Invalid handler');
    }

    if (eventHandlers[0].event !== 'Assign(indexed address,uint256)') {
      throw new Error('Invalid event');
    }

    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
