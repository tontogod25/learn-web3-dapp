import { Avalanche } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';

import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = any

export default async function query(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const datahubUrl = getDatahubNodeURL(CHAINS.AVALANCHE, AVALANCHE_NETWORKS.FUJI);
  const url = new URL(datahubUrl);

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

    // Initialize client connections to each Avalanche chain
    const info = client.Info()
    const chain = client.XChain()
    const keychain = chain.keyChain()
    // const key = keychain.importKey(keypair)


    // TODO: Property 'data' does not exist on type 'NextApiResponse<any>'. ts(2339)
    // It will 500 error without res.data in some cases - RX
    res.status(200)
            .json(res.data);
}
