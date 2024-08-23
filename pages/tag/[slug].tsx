import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Index from '../index';
import { getPostsByTag, getAllPostsForHome } from '../../lib/api';

export default function TagPage(props) {
  const router = useRouter();
  const { slug } = router.query;

  return <Index {...props} initialTag={slug as string} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params, preview = false }) => {
  const slug = params?.slug as string;
  const tagPosts = await getPostsByTag(slug);
  const allData = await getAllPostsForHome(preview);

  return {
    props: {
      initialPosts: tagPosts,
      allTags: allData.tags,
      preview,
      initialTag: slug,
    },
  };
};