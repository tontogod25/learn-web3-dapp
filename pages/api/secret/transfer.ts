import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeUrl} from '@figment-secret/lib';
import {
  EnigmaUtils,
  SigningCosmWasmClient,
  Secp256k1Pen,
  pubkeyToAddress,
  encodeSecp256k1Pubkey,
} from 'secretjs';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const url = getNodeUrl();
    const {mnemonic, txAmount} = req.body;
    console.log(url);
    console.log(mnemonic);

    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const address = pubkeyToAddress(pubkey, 'secret');

    // 0. A very specific Secret features (allowing to made the transaction encrypted)
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

    // 1. The fees you'll need to pay to complete the transaction
    const fees = {
      send: {
        amount: [{amount: '80000', denom: 'uscrt'}],
        gas: '80000',
      },
    };

    // 2. Initialize a secure Secret client
    const client = new SigningCosmWasmClient(
      url,
      address,
      (signBytes) => signingPen.sign(signBytes),
      txEncryptionSeed,
      fees,
    );

    // 3. Send tokens
    const memo = 'sendTokens example'; // optional memo
    const sent = await client.sendTokens(
      address,
      [
        {
          amount: txAmount,
          denom: 'uscrt',
        },
      ],
      memo,
    );

    // 4. Query the tx result
    const query = {id: sent.transactionHash};
    const transaction = await client.searchTx(query);
    console.log('Transaction: ', transaction);
    const hash = transaction[0].hash;

    res.status(200).json(hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
