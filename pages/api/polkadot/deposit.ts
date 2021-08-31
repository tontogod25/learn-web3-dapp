import type { NextApiRequest, NextApiResponse } from "next";

import { ApiPromise } from "@polkadot/api";
import { WsProvider } from "@polkadot/rpc-provider";
import { getSafeUrl } from "@polka/lib";

export default async function deposit(
  _req: NextApiRequest,
  res: NextApiResponse<number | string>
) {
  try {
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: provider });
    const deposit = api.consts.balances.existentialDeposit.toNumber();
    console.log(deposit)
    res.status(200).json(deposit);
  } catch (error) {
    console.log(error);
    res.status(500).json("Unable to get existential deposit");
  }
}
