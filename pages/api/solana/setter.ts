import {
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {CHAINS, SOLANA_NETWORKS, SOLANA_PROTOCOLS} from 'types';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from 'utils/datahub-utils';

export default async function setter(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {greeter, secret, programId, network} = req.body;
    const url = getNodeURL(
      CHAINS.SOLANA,
      SOLANA_NETWORKS.DEVNET,
      SOLANA_PROTOCOLS.RPC,
      network,
    );
    const connection = new Connection(url, 'confirmed');

    const greeterPublicKey = new PublicKey(greeter);
    const programKey = new PublicKey(programId);

    const payerSecretKey = new Uint8Array(JSON.parse(secret));
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

    const instruction = new TransactionInstruction({
      keys: [{pubkey: greeterPublicKey, isSigner: false, isWritable: true}],
      programId: programKey,
      data: Buffer.alloc(0), // All instructions are hellos
    });

    const hash = await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [payerKeypair],
    );

    res.status(200).json(hash);
  } catch (error) {
    console.error(error);
    res.status(500).json('Get balance failed');
  }
}
