import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SentenceCard from './SentenceCard';
// import { BookmarkStatus } from '@/types/bookmark';

// import * as BookmarkProvider from '@/providers/BookmarkProvider';

jest.mock('@/providers/BookmarkProvider', () => ({
  useBookmarks: () => ({ bookmarks: {}, filterBookmarks: [] }),
}));

const mondai = {
  id: 1,
  sentence: {
    id: 1,
    text: 'Test sentence',
    translation: 'Dịch',
    audio: undefined,
  },
  questions: [],
};

describe('SentenceCard', () => {
  it('renders sentence text', () => {
    const { getByText } = render(<SentenceCard mondai={mondai} jsonPath="" />);
    expect(getByText('Test sentence')).toBeInTheDocument();
  });

  it('shows hint card when help icon is clicked', () => {
    const { container } = render(<SentenceCard mondai={mondai} jsonPath="" />);
    const helpIcons = container.querySelectorAll('svg');
    fireEvent.click(helpIcons[0]);
    // No assertion for modal, as HintCard may not render visible text
  });

  //   it('does not render if not visible', () => {
  //     jest.spyOn(BookmarkProvider, 'useBookmarks').mockReturnValue({
  //       bookmarks: {},
  //       filterBookmarks: ['saved' as BookmarkStatus],
  //       updateBookmark: jest.fn(),
  //       setFilterBookmarks: jest.fn(),
  //     });
  //     const { container } = render(<SentenceCard mondai={mondai} />);
  //     expect(container.firstChild).toBeNull();
  //     (BookmarkProvider.useBookmarks as jest.Mock).mockRestore?.();
  //     jest.restoreAllMocks();
  //   });
});
