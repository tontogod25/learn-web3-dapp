import type { NextApiRequest, NextApiResponse } from "next";
import { configFromNetwork} from "@near/lib";
import { connect } from "near-api-js";

export default async function connection(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { network } = req.body;
  try {
    const config = configFromNetwork(network);
    const near = undefined;
    const provider = undefined
    const status = undefined;
    return res.status(200).json(status.version.version);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error connection to NEAR");
  }
}
