import type {WalletProviderProps} from '@solana/wallet-adapter-react';
import {WalletProvider} from '@solana/wallet-adapter-react';

import {
  PhantomWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {useMemo} from 'react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';

import('@solana/wallet-adapter-react-ui/styles.css' as any);

export function ClientWalletProvider(
  props: Omit<WalletProviderProps, 'wallets'>,
): JSX.Element {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolletWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      // ... Add more wallets here
      // List of all wallets can be found here
      // https://github.com/solana-labs/wallet-adapter#setup
    ],
    [],
  );

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  );
}

export default ClientWalletProvider;
