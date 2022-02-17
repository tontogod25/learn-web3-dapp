import {CHAINS, ChainPropT} from 'types';
import {getStaticPropsForChain} from 'utils/pages';
import Layout from 'components/shared/Layout';
import {Pyth} from 'components/protocols';
import dynamic from 'next/dynamic';
import {ConnectionProvider} from '@solana/wallet-adapter-react';

export async function getStaticProps() {
  return getStaticPropsForChain(CHAINS.PYTH);
}
const WalletProvider = dynamic(
  () => import('@figment-pyth/lib/walletProvider'),
  {
    ssr: false,
  },
);

const Protocol = (props: ChainPropT) => {
  const {markdown, chain} = props;
  const endpoint = 'https://solana-api.projectserum.com';

  return (
    <Layout markdown={markdown} chain={chain}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider>
          <Pyth />
        </WalletProvider>
      </ConnectionProvider>
    </Layout>
  );
};

export default Protocol;
