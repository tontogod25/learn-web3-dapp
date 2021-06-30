import { Avalanche } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';

import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = any

export default function connect(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = new URL(getDatahubNodeURL(CHAINS.AVALANCHE, AVALANCHE_NETWORKS.FUJI));

  const client = new Avalanche(
    url.hostname,
    parseInt(url.port),
    url.protocol.replace(":", ""),
    parseInt(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK_ID as string),
    "X",
    "C",
    process.env.NEXT_PUBLIC_AVALANCHE_NETWORK_NAME
  );  

  // Apply DataHub API authentication token
  client.setAuthToken(process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY as string)

  const info = client.Info()
  console.log("Fetching network information.")
  info.getNodeVersion()
    .then((response: any) => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error connecting to Avalanche" })
    });
}
