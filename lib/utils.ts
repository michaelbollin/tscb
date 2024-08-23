import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { Dispatch, SetStateAction } from 'react';
import { NextRouter } from 'next/router';

export const resetAll = (
  setSearchTerm: Dispatch<SetStateAction<string>>,
  setShowSuggestions: Dispatch<SetStateAction<boolean>>,
  setFilteredPosts: Dispatch<SetStateAction<any[]>>,
  initialPosts: any[],
  router: NextRouter
) => {
  setSearchTerm('');
  setShowSuggestions(false);
  setFilteredPosts(initialPosts);
  router.replace('/', undefined, { shallow: true });
};