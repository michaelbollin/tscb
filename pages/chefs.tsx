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
              className="bg-gray-900  border border-gray-800 rounded-lg p-6 flex flex-row gap-4"
            >
              <div>
                <img
                  src={user.userData.avatarPicture.node.sourceUrl}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="rounded-3xl mb-4"
                />
               
              </div>
              <div>
              <h2 className="text-2xl mb-0">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-400">{user.name}</p>
              <div className="flex flex-row gap-2 mt-2">
                <Link className="border border-gray-400 rounded-md px-3 py-1 text-gray-400 hover:bg-gray-400 hover:text-gray-800"
                  href={`/chef/${user.slug}`}
                >
                  About
                </Link>{' '}
                <Link
                  href={`/d/${user.slug}`}
                 className="border border-gray-400 rounded-md px-3 py-1 text-gray-400 hover:bg-gray-400 hover:text-gray-800"
                >
                  Dishes
                </Link>
                </div>
              </div>
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
