'use client';

import { BookmarkProviderProps, BookmarkContextType, BookmarkStatus } from '@/types/bookmark';
import { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext<BookmarkContextType | undefined>(undefined);

const LOCAL_KEY = 'adayroi_bookmarks';

export function BookmarksProvider({ testId, children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Record<string, string>>({});
  const [filterBookmarks, setFilterBookmarks] = useState<BookmarkStatus[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`${LOCAL_KEY}_${testId}`);
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, [testId]);

  useEffect(() => {
    if (Object.keys(bookmarks).length > 0) {
      localStorage.setItem(`${LOCAL_KEY}_${testId}`, JSON.stringify(bookmarks));
    }
  }, [bookmarks, testId]);

  const updateBookmark = (id: string, newBookmark: string) => {
    setBookmarks((prev) => ({ ...prev, [id]: newBookmark }));
  };

  return (
    <Context.Provider value={{ bookmarks, updateBookmark, filterBookmarks, setFilterBookmarks }}>
      {children}
    </Context.Provider>
  );
}

export function useBookmarks(): BookmarkContextType {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within an BookmarsProvider');
  }
  return context;
}
