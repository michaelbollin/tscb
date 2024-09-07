import Head from 'next/head';
import Link from 'next/link';
import Container from '../components/container';
import Layout from '../components/layout';
import { CMS_NAME } from '../lib/constants';

export default function ThankYou({ preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Thank You | ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <h1 className="text-4xl md:text-6xl lg:text-6xl mb-10 font-playfair font-normal bg-gradient-to-r from-gray-200 to-black text-transparent bg-clip-text text-center md:text-left">
          Thank You for Your Submission
        </h1>
        <p className="text-xl mb-4">Your dish has been submitted successfully and is pending review.</p>
        <Link href="/" className="text-blue-400 hover:underline">
          Return to Home
        </Link>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview },
  };
}