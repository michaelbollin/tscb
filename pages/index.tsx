import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import Layout from '../components/layout';
import { getAllPostsForHome, getPostsByTag } from '../lib/api';
import { CMS_NAME } from '../lib/constants';
import Tag from '../components/ui/Tag';

export default function Index({ initialPosts, allTags, preview, initialTag = '' }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialTag);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts.edges);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (initialTag) {
      handleSearch(initialTag);
    } else {
      setFilteredPosts(initialPosts.edges);
    }
  }, [initialTag, initialPosts]);

  useEffect(() => {
    if (router.query.tag && router.query.tag !== searchTerm) {
      handleTagClick(router.query.tag as string);
    }
  }, [router.query.tag]);

  const handleTagClick = (tagName: string) => {
    handleSearch(tagName);
  };

  const handleUserClick = (username: string) => {
    router.push(`/d/${username}`);
  };

  const closePopup = () => {
    // This function will be passed down to close the popup
    window.history.pushState({}, '', '/');
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearch = async (term: string) => {
    if (term !== searchTerm) {
      window.history.pushState({}, '', `/tag/${term}`);
    }
    setSearchTerm(term);
    setShowSuggestions(false);
    const searchResults = await getPostsByTag(term);
    setFilteredPosts(searchResults?.edges || []);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const resetAll = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setFilteredPosts(initialPosts.edges);
    router.replace('/', undefined, { shallow: true });
  };

  return (
    <Layout preview={preview} onReset={resetAll}>
      <Head>
        <title>{`${searchTerm || 'Home'} | ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <h1 className="text-4xl md:text-6xl lg:text-6xl mb-10 font-playfair font-normal bg-gradient-to-r from-gray-200 to-gray-600 text-transparent bg-clip-text text-center md:text-left">
          Dishes to adore, from web chefs
        </h1>

        {filteredPosts.length > 0 && <MoreStories posts={filteredPosts} onUserClick={handleUserClick} onTagClick={handleTagClick} closePopup={closePopup} />}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allData = await getAllPostsForHome(preview);

  return {
    props: {
      initialPosts: allData.posts,
      allTags: allData.tags,
      preview,
    },
    revalidate: 10,
  };
};