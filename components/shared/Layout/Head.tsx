import Head from 'next/head';

export default function HeadLayout({label}: {label: string}) {
  return (
    <Head>
      <title>{`Figment Learn - ${label} Pathway`}</title>
      <meta
        name="description"
        content="Figment Learn's Web 3 education courses"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
