import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Index from '../index';
import { getPostsByUsername, getAllPostsForHome } from '../../lib/api';

export default function UserPage(props) {
  const router = useRouter();
  const { slug } = router.query;

  return <Index {...props} initialUsername={slug as string} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params, preview = false }) => {
  const slug = params?.slug as string;
  const userPosts = await getPostsByUsername(slug);
  const allData = await getAllPostsForHome(preview);

  return {
    props: {
      initialPosts: userPosts,
      allTags: allData.tags,
      preview,
      initialUsername: slug,
    },
  };
};