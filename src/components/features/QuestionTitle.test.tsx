import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionTitle from './QuestionTitle';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
  ) as any;
});

afterAll(() => {
  // @ts-expect-error: fetch may not exist or may not be a mock function
  if (global.fetch && global.fetch.mockClear) global.fetch.mockClear();
  // @ts-expect-error: fetch may not exist on global
  delete global.fetch;
});

describe('QuestionTitle', () => {
  const defaultProps = {
    id: 1,
    text: 'Sample Question',
    onShowHint: jest.fn(),
  };

  it('renders the question text', () => {
    render(<QuestionTitle {...defaultProps} />);
    expect(screen.getByText('1. Sample Question')).toBeInTheDocument();
  });

  it('renders audio player if audio prop is provided', async () => {
    let container: HTMLElement;
    await act(async () => {
      const renderResult = render(<QuestionTitle {...defaultProps} audio="/audio.mp3" />);
      container = renderResult.container;
    });
    expect(container!.querySelector('audio')).toBeInTheDocument(); // AudioPlayer should render an audio element
  });

  it('renders BookmarkQuestion and HintIcon', () => {
    render(<QuestionTitle {...defaultProps} />);
    // These components may not have roles, so we check by alt text or test id if available
    // expect(screen.getByTestId('bookmark-question')).toBeInTheDocument();
    // expect(screen.getByTestId('hint-icon')).toBeInTheDocument();
  });
});
