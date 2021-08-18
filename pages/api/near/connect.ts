import type { NextApiRequest, NextApiResponse } from "next";
import { NearConnectResponse } from "@near/types";
import { configFromNetworkId } from "@near/lib";
import { connect as nearConnect } from "near-api-js";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<NearConnectResponse>
) {
  const { networkId } = req.body;
  try {
    const config = configFromNetworkId(networkId);
    const client = await nearConnect(config);
    const providerStatus = await client.connection.provider.status();
    console.log(providerStatus);
    const version = providerStatus.version.version;
    return res.status(200).json(version);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error connection to NEAR");
  }
}
