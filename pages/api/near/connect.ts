import type { NextApiRequest, NextApiResponse } from 'next'

import { NearConnectReponse } from 'types/near-types';
import { getNearConfig } from "utils/near-utils";

import { connect as nearConnect  } from "near-api-js";


export default async function connect(
  _req: NextApiRequest,
  res: NextApiResponse<NearConnectReponse>
) {
    try {
        const config = getNearConfig();
        const client = await nearConnect(config);
        const providerStatus = await client.connection.provider.status();
        const version = providerStatus.version.version;
        return res.status(200).json(version)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error connection to NEAR')
    } 
}
