import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import * as quizLib from '@/lib/quiz';
import { notFound } from 'next/navigation';

jest.mock('@/lib/quiz', () => ({
  readQuizJson: jest.fn(() =>
    Promise.resolve([
      { questions: [{ id: 1 }], name: 'Section 1', description: '', skill: '', part: '' },
    ]),
  ),
}));
jest.mock('@/providers/AnswerProvider', () => ({
  AnswersProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="answers-provider">{children}</div>
  ),
}));
jest.mock('@/providers/BookmarkProvider', () => ({
  BookmarksProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bookmarks-provider">{children}</div>
  ),
}));
jest.mock('@/components/cards/MondaiCard', () => {
  const MockMondaiCard = () => <div data-testid="mondai-card">MondaiCard</div>;
  MockMondaiCard.displayName = 'MockMondaiCard';
  return MockMondaiCard;
});
jest.mock('@/components/features/MenuQuiz', () => ({
  MenuQuiz: () => <div data-testid="menu-quiz">MenuQuiz</div>,
}));
jest.mock('@/components/features/QuizPagination', () => {
  const MockQuizPagination = () => <div data-testid="quiz-pagination">QuizPagination</div>;
  MockQuizPagination.displayName = 'MockQuizPagination';
  return MockQuizPagination;
});
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    notFound: jest.fn(() => {
      throw new Error('notFound');
    }),
  };
});

describe('Quiz Page', () => {
  it('renders mondai cards, providers, menu, and pagination', async () => {
    const params = Promise.resolve({ level: 'n1', section: 'grammar' as any, page: '1' });
    render(await Page({ params }));
    expect(screen.getByTestId('answers-provider')).toBeInTheDocument();
    expect(screen.getByTestId('bookmarks-provider')).toBeInTheDocument();
    expect(screen.getByTestId('mondai-card')).toBeInTheDocument();
    expect(screen.getByTestId('menu-quiz')).toBeInTheDocument();
    expect(screen.getByTestId('quiz-pagination')).toBeInTheDocument();
  });

  it('calls notFound when no data is returned', async () => {
    (quizLib.readQuizJson as jest.Mock).mockResolvedValueOnce(undefined);
    const params = Promise.resolve({ level: 'n1', section: 'grammar' as any, page: '1' });
    try {
      await Page({ params });
    } catch {}
    expect(notFound).toHaveBeenCalled();
  });

  it('calls notFound when questions array is empty', async () => {
    (quizLib.readQuizJson as jest.Mock).mockResolvedValueOnce([]);
    const params = Promise.resolve({ level: 'n1', section: 'grammar' as any, page: '1' });
    try {
      await Page({ params });
    } catch {}
    expect(notFound).toHaveBeenCalled();
  });
});
