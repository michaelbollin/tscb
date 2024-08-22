import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Tags from "../../components/tags";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import ImagePopup from "@/components/image-popup";

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  // Check if the post data is available in the router query
  const postData = router.query.postData ? JSON.parse(router.query.postData as string) : null;

  // Use the postData if available, otherwise use the fetched post
  const displayPost = postData || post;

  if (router.isFallback) {
    return <PostTitle>Loading…</PostTitle>;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.query.popup === 'true' ? (
          <ImagePopup
            post={displayPost}
            onClose={() => router.push('/', undefined, { shallow: true })}
            open={true}
          />
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${displayPost.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={displayPost.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader
                title={displayPost.title}
                coverImage={displayPost.featuredImage}
                date={displayPost.date}
                author={displayPost.author}
                categories={displayPost.categories}
              />
              <PostBody content={displayPost.content} />
              <footer>
                {displayPost.tags.edges.length > 0 && <Tags tags={displayPost.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
    fallback: true,
  };
};