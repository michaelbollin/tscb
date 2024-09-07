import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Container from '../components/container';
import Layout from '../components/layout';
import { getAllUsers } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import Image from 'next/image';

export default function Chefs({ users, preview }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Chefs | ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <h1 className="text-4xl md:text-6xl lg:text-6xl mb-10 font-playfair font-normal bg-gradient-to-r from-gray-200 to-black text-transparent bg-clip-text text-center md:text-left">
          Chefs that make a difference
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.edges.map(({ node: user }) => (
            <div
              key={user.id}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center"
            >
              <img
                src={user.avatar.url}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-400 text-center mb-4">
                {user.description}
              </p>
              <Link
                href={`/chef/${user.slug}`}
                className="text-blue-400 hover:underline"
              >
                About
              </Link>{' '}
              <Link
                href={`/d/${user.slug}`}
                className="text-blue-400 hover:underline"
              >
                Dishes
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const users = await getAllUsers();

  return {
    props: {
      users,
      preview,
    },
    revalidate: 60, // Revalidate every minute
  };
};
