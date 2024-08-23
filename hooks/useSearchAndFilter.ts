import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getPostsByTag } from '../lib/api';

export function useSearchAndFilter(initialPosts, initialTag = '') {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialTag);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts.edges);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term);
    setShowSuggestions(false);
    
    // Update URL without triggering a re-render
    if (term) {
      window.history.pushState({}, '', `/tag/${term}`);
    } else {
      window.history.pushState({}, '', '/');
    }
    
    const tagResults = await getPostsByTag(term);
    setFilteredPosts(tagResults.edges);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const tagFromUrl = path.startsWith('/tag/') ? path.split('/').pop() : '';
      if (tagFromUrl !== searchTerm) {
        handleSearch(tagFromUrl);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleSearch, searchTerm]);

  const handleTagClick = (tagName: string) => {
    handleSearch(tagName);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const resetAll = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setFilteredPosts(initialPosts.edges);
    window.history.pushState({}, '', '/');
  };

  return {
    searchTerm,
    filteredPosts,
    suggestions,
    showSuggestions,
    handleTagClick,
    handleSearchChange,
    handleSearch,
    handleKeyPress,
    resetAll,
    setShowSuggestions,
  };
}