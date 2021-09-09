import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {Connection, PublicKey} from '@solana/web3.js';
import {getNodeURL} from 'utils/datahub-utils';
import * as borsh from 'borsh';

// The state of a greeting account managed by the hello world program
class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

export default async function getter(
  req: NextApiRequest,
  res: NextApiResponse<string | number>,
) {
  try {
    const {network, greeter} = req.body;
    const url = getNodeURL(
      CHAINS.SOLANA,
      SOLANA_NETWORKS.DEVNET,
      SOLANA_PROTOCOLS.RPC,
      network,
    );
    const connection = new Connection(url, 'confirmed');
    const greeterPublicKey = new PublicKey(greeter);

    const accountInfo = await connection.getAccountInfo(greeterPublicKey);

    if (accountInfo === null) {
      throw new Error('Error: cannot find the greeted account');
    }

    const greeting = borsh.deserialize(
      GreetingSchema,
      GreetingAccount,
      accountInfo.data,
    );

    res.status(200).json(greeting.counter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}
