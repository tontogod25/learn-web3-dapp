import { Avalanche } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'

import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import { getAvalancheClient } from 'utils/avalanche-utils';
import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = string

export default function connect(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = getAvalancheClient()
  const info = client.Info()

  info.getNodeVersion()
    .then((response: string) => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json("Error connecting to Avalanche")
    });

}
