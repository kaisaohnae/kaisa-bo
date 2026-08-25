import Head from 'next/head';

export default function Title({title}: { title?: string }) {
  // let pageTitle = `${title ? title + ' | ' : ''} kaisa-bo`;
  let pageTitle = `Kaisa`;
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}
