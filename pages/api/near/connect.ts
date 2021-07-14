import type { NextApiRequest, NextApiResponse } from 'next'
import { NearConnectReponse } from 'types/near-types';
import { configFromNetworkId } from '@near/utils'
import { connect as nearConnect  } from "near-api-js";


export default async function(
  req: NextApiRequest,
  res: NextApiResponse<NearConnectReponse>
) {
    const { networkId } = req.body;
    console.log(networkId);
    try {
        const config = configFromNetworkId(networkId);
        console.log(config);
        const client = await nearConnect(config);
        const providerStatus = await client.connection.provider.status();
        const version = providerStatus.version.version;
        return res.status(200).json(version)
    } catch (error) {
        console.error(error)
        return res.status(500).json('Error connection to NEAR')
    } 
}
