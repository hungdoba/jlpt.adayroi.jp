import React from 'react';
import { render, act } from '@testing-library/react';
import { BookmarksProvider, useBookmarks } from './BookmarkProvider';
import { BookmarkStatus } from '@/types/bookmark';

function TestComponent() {
  const { bookmarks, updateBookmark, filterBookmarks, setFilterBookmarks } = useBookmarks();
  return (
    <div>
      <button onClick={() => updateBookmark('1', 'saved')}>Set Bookmark</button>
      <button onClick={() => setFilterBookmarks(['saved' as BookmarkStatus])}>Set Filter</button>
      <span data-testid="bookmark">{bookmarks['1']}</span>
      <span data-testid="filter">{filterBookmarks.join(',')}</span>
    </div>
  );
}

describe('BookmarksProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides and updates bookmarks', () => {
    const { getByText, getByTestId } = render(
      <BookmarksProvider testId="test1">
        <TestComponent />
      </BookmarksProvider>,
    );
    act(() => {
      getByText('Set Bookmark').click();
    });
    expect(getByTestId('bookmark').textContent).toBe('saved');
  });

  it('sets filterBookmarks', () => {
    const { getByText, getByTestId } = render(
      <BookmarksProvider testId="test2">
        <TestComponent />
      </BookmarksProvider>,
    );
    act(() => {
      getByText('Set Filter').click();
    });
    expect(getByTestId('filter').textContent).toBe('saved');
  });
});
