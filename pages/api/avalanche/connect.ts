import type { NextApiRequest, NextApiResponse } from 'next'
import { ConnectReponse } from 'types/response-types';

import { getAvalancheClient } from 'utils/avalanche-utils';

export default function connect(
  req: NextApiRequest,
  res: NextApiResponse<ConnectReponse>
) {
  const client = getAvalancheClient()
  const info = client.Info()

  info.getNodeVersion()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json("Error connecting to Avalanche")
    });

}
