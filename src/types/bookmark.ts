import { ReactNode } from 'react';

export enum BookmarkStatus {
  Again = 'again', // red (failed recall, review soon)
  Hard = 'hard', // yellow (struggled but recalled, review sooner)
  Good = 'good', // green (recalled correctly, standard review interval)
  Easy = 'easy', // blue (recalled easily, longer review interval)
  New = 'new', // gray (not yet studied)
}

export enum NextBookmarkAction {
  None = 'none', // not has any action yet
  Next = 'next', // move to next status
  Previous = 'previous', // move to previous status
  Ignore = 'ignore', // do not change status
}

export interface BookmarkProviderProps {
  testId: string;
  children: ReactNode;
}

export interface BookmarkContextType {
  bookmarks: Record<string, string>;
  updateBookmark: (id: string, newBookmark: string) => void;
  filterBookmarks: BookmarkStatus[];
  setFilterBookmarks: (statuses: BookmarkStatus[]) => void;
}
