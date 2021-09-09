import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from 'utils/datahub-utils';
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {address, secret, recipient, lamports, network} = req.body;
    const url = getNodeURL(
      CHAINS.SOLANA,
      SOLANA_NETWORKS.DEVNET,
      SOLANA_PROTOCOLS.RPC,
      network,
    );
    const connection = new Connection(url, 'confirmed');

    const fromPubkey = new PublicKey(address as string);
    const toPubkey = new PublicKey(recipient as string);
    //... let's skip the beginning as it's should be familiar for you now.
    // The secret key is stored in our state as a stingified array
    const secretKey = Uint8Array.from(JSON.parse(secret as string));

    // Find the parameter to pass
    const instructions = SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    });

    const signers = [
      {
        publicKey: fromPubkey,
        secretKey,
      },
    ];

    const transaction = new Transaction().add(instructions);

    const hash = await sendAndConfirmTransaction(
      connection,
      transaction,
      signers,
    );

    res.status(200).json(hash);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}
