import type { NextApiRequest, NextApiResponse } from 'next';
import { Avalanche } from 'avalanche';
import { AVALANCHE_NETWORKS, CHAINS } from 'types/types';
import { getDatahubNodeURL } from 'utils/datahub-utils';
import fs from 'fs';

type Data = any;

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
  client.setAuthToken(process.env.NEXT_PUBLIC_DATAHUB_AVALANCHE_API_KEY as string);

  // Define the path where our keypair will be saved in JSON format
	const credentialsPath = './credentials'
  const keyPath = `${credentialsPath}/avalanche_keypair.json`
  const chain = client.XChain(); // the chainID can be altered if necessary, but we are on XChain here
	const keyChain = chain.keyChain(); // keyChain will be the returned instance of KeyChain from AVMAPI
	const key = keyChain.makeKey(); // makeKey returns a keypair

  // Check if we already have an existing keypair
  if (!fs.existsSync(keyPath)) {
    console.log("Generating a new keypair...")
    const key = keyChain.makeKey()

    console.log("Saving keypair to", keyPath)
    fs.writeFileSync(keyPath, JSON.stringify({
      pubkey: key.getPublicKeyString(),
      privkey: key.getPrivateKeyString(),
    }, null, 2))
  }

  const data = JSON.parse(fs.readFileSync(keyPath))
  const keyImport = keyChain.importKey(data.privkey)
  const keyAddress = keyImport.getAddressString();
  console.log("Loading credentials into keychain...")
  console.log("Imported X-chain address:", keyImport.getAddressString())


	res.status(200).json(keyAddress);
}
