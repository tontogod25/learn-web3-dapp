import Head from 'next/head';
import {ChainType} from 'types';

export default function HeadLayout({chain}: {chain: ChainType}) {
  return (
    <Head>
      <title>{`Figment Learn - ${chain.label} Pathway`}</title>
      <meta
        name="description"
        content="Figment Learn's Web 3 education courses"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
