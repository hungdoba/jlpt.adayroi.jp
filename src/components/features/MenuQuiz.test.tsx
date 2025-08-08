import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BookmarksProvider } from '@/providers/BookmarkProvider';
import { MenuQuiz } from './MenuQuiz';

jest.mock('@/providers/AnswerProvider', () => ({
  useAnswers: () => ({
    clearAnswers: jest.fn(),
    getFinalAnswerIndex: jest.fn(() => 0),
    showHint: false,
    toggleHint: jest.fn(),
  }),
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('MenuQuiz', () => {
  it('renders menu button', () => {
    const { getByRole } = render(
      <BookmarksProvider testId="test">
        <MenuQuiz itemsCount={10} itemsPerPage={5} pageNumber={1} />
      </BookmarksProvider>,
    );
    expect(getByRole('button')).toBeInTheDocument();
  });
});
