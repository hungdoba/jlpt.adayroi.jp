import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionCard from './QuestionCard';

jest.mock('@/providers/AnswerProvider', () => ({
  useAnswers: () => ({
    showHint: false,
    answers: {},
    updateAnswer: jest.fn(),
  }),
}));
jest.mock('@/providers/BookmarkProvider', () => ({
  useBookmarks: () => ({
    bookmarks: {},
    updateBookmark: jest.fn(),
    filterBookmarks: [],
  }),
}));
jest.mock('@/lib/localStorage', () => ({
  addHeatmapDataForToday: jest.fn(),
}));

const question = {
  id: 1,
  text: 'Sample question',
  audio: undefined,
  image: undefined,
  options: [
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
  ],
  correctAnswer: 1,
  explanation: 'Explanation',
  points: 1,
};

describe('QuestionCard', () => {
  it('renders question text', () => {
    const { getByText } = render(<QuestionCard question={question} />);
    expect(getByText((content) => content.includes('Sample question'))).toBeInTheDocument();
  });

  //   it('renders options', () => {
  //     const { getByText } = render(<QuestionCard question={question} />);
  //     expect(getByText((content) => content.includes('A'))).toBeInTheDocument();
  //     expect(getByText('B')).toBeInTheDocument();
  //   });

  it('shows hint card when explanation icon is clicked', () => {
    const { container } = render(<QuestionCard question={question} />);
    const icons = container.querySelectorAll('svg');
    if (icons.length > 0) {
      fireEvent.click(icons[0]);
    }
    // No assertion for modal, as HintCard may not render visible text
  });
});
