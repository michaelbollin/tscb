import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import Container from '@/components/container';
import Layout from '@/components/layout';
import { getAllUsers } from '@/lib/api';
import { CMS_NAME } from '@/lib/constants';
import { useRouter } from 'next/router';

export default function ChefPage({ user, preview }) {
  const router = useRouter();

  const closePopup = () => {
    router.push('/');
  };

  const { name, avatar, description, userData, firstName, lastName } = user;
  return (
    <Layout preview={preview} onReset={closePopup}>
      <Head>
        <title>{`${name} - Chef Profile | ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <h1 className="text-4xl md:text-6xl font-playfair">{firstName} {lastName}</h1>
        <p className="text-gray-400">{name}</p>
        <div className="flex flex-col md:flex-row gap-8 mt-4">
          <img className="rounded-xl md:w-1/3" src={userData.avatarPicture.node.sourceUrl} alt={name} />
          <div className="bio" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
  const allUsers =  await getAllUsers();
  const user = allUsers.edges.find(({ node }) => node.slug === params?.slug)?.node;

  if (!user) {
    return { notFound: true };
  }

  return {
    props: { user, preview },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allUsers = await getAllUsers();
  const paths = allUsers.edges.map(({ node }) => ({
    params: { slug: node.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
