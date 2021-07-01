import { Avalanche } from 'avalanche';
import type { NextApiRequest, NextApiResponse } from 'next'
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';

import { getDatahubNodeURL } from 'utils/datahub-utils';

type Data = any

export default function account(
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

  const chain = client.XChain() // XChain is the exchange chain
	const keyChain = chain.keyChain() // keyChain will be the returned instance of KeyChain from AVMAPI
	const key = keyChain.makeKey() // makeKey returns a keypair

	const keyAddress = key.getAddressString()
	console.log("keyAddress :", keyAddress) // Logged to the server console, not the browser console

	res.status(200).json(keyAddress)
}
