jest.mock('@/providers/BookmarkProvider', () => ({
  useBookmarks: () => ({
    bookmarks: {},
    updateBookmark: jest.fn(),
    filterBookmarks: [],
    setFilterBookmarks: jest.fn(),
  }),
  BookmarksProvider: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuJlpt } from './MenuJlpt';

jest.mock('@/providers/AnswerProvider', () => ({
  useAnswers: () => ({
    clearAnswers: jest.fn(),
    getFinalAnswerIndex: jest.fn(() => 0),
    showHint: false,
    toggleHint: jest.fn(),
  }),
}));

describe('MenuJlpt', () => {
  it('renders menu button', () => {
    const { getByRole } = render(<MenuJlpt />);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
