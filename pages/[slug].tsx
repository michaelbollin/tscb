import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Layout from '../components/layout';
import { getPostBySlug, getAllPostsForHome } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import ImagePopup from '../components/image-popup';
import { useRouter } from 'next/router';


export default function Page({ post, morePosts, preview }) {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/tag/${tag}`, undefined, { shallow: true });
  };

  const handleUserClick = (username: string) => {
    router.push(`/d/${username}`, undefined, { shallow: true });
  };

  const closePopup = () => {
    router.push('/');
  };

  const { title, featuredImage, tags, excerpt, author } = post;
  return (
    <Layout preview={preview} onReset={closePopup}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        {morePosts?.edges?.length > 0 && <MoreStories  posts={morePosts.edges} onTagClick={handleTagClick} onUserClick={handleUserClick} closePopup={closePopup} />}
      </Container>
      <ImagePopup
        title={title}
        author={author}
        onTagClick={handleTagClick}
        onUserClick={handleUserClick}
        coverImage={featuredImage.node.sourceUrl}
        tags={tags.edges.map((tag) => tag.node.name)}
        excerpt={excerpt}
        onClose={() => router.push('/')}
        open={true}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const post = await getPostBySlug(params?.slug as string);
  const morePosts = await getAllPostsForHome(preview);
  
  return {
    props: { post, morePosts, preview },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsForHome(false);
  return {
    paths: allPosts?.posts?.edges?.map(({ node }) => ({
      params: { slug: node.slug },
    })) || [],
    fallback: false,
  };
};