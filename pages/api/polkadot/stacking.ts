import type {NextApiRequest, NextApiResponse} from 'next';
import {PolkadotAccountResponse} from '@polkadot/types';
import {Keyring} from '@polkadot/api';
import {mnemonicGenerate, mnemonicValidate} from '@polkadot/util-crypto';
import {ApiPromise} from '@polkadot/api';
import {WsProvider} from '@polkadot/rpc-provider';
import {getSafeUrl} from '@polkadot/lib';

const DECIMAL_OFFSET = 10 ** 12;

export default async function staking(
  req: NextApiRequest,
  res: NextApiResponse<number | string>,
) {
  try {
    const url = getSafeUrl();
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({provider: provider});

    const {mnemonic} = req.body;

    const keyring = new Keyring({type: 'sr25519'});
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;

    const proxyMnemonic = mnemonicGenerate();
    const isValidMnemonic = mnemonicValidate(proxyMnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic');
    }
    const proxyAccount = keyring.addFromUri(proxyMnemonic);
    const proxyAddress = proxyAccount.address;
    const [proxies] = await api.query.proxy.proxies(account.address);
    const proxyDepositBase = api.consts.proxy.proxyDepositBase.toNumber();
    const proxyDepositFactor = api.consts.proxy.proxyDepositFactor.toNumber();
    const requiredDeposit =
      proxyDepositBase + proxyDepositFactor * proxies.length;
    console.log(
      `Required deposit for creating proxy: ${
        requiredDeposit / DECIMAL_OFFSET
      }`,
    );

    // Add a staking proxy
    const proxyType = 'Staking';
    const delay = 0;
    let txHash = await api.tx.proxy
      .addProxy(proxyAccount.address, proxyType, delay)
      .signAndSend(account);
    console.log(
      `.addProxy() tx: https://westend.subscan.io/extrinsic/${txHash}`,
    );

    res.status(200).json(DECIMAL_OFFSET);
  } catch (error) {
    console.log(error);
    res.status(500).json('Connection to network failed');
  }
}
