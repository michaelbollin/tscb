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
        <h1 className="text-4xl md:text-4xl lg:text-4xl mb-10 font-playfair font-normal bg-gradient-to-r from-gray-200 to-gray-600 text-transparent bg-clip-text text-center md:text-left !leading-[3rem]">
          No videos, no tasting, just perfect dishes 
        </h1>
        <div className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-8">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-2 bg-black text-white border border-gray-400 rounded-md focus:outline-none focus:border-gray-300 placeholder-gray-300"
            />
            {searchTerm && (
              <button
                onClick={resetAll}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            )}
            {showSuggestions &&
              searchTerm.trim() !== '' &&
              suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-black border border-gray-400 rounded-md mt-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleTagClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
          </div>
          <div className="flex space-x-2 bg-black p-2 rounded-md">
            {['pasta','american','spicy', 'grilled', 'beef', 'cheesecake'].map((node) => (
              <Tag
                key={node}
                text={node}
                onClick={() => handleTagClick(node)}
              />
            ))}
          </div>
        </div>
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