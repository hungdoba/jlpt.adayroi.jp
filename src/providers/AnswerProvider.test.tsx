import React from 'react';
import { render, act } from '@testing-library/react';
import { AnswersProvider, useAnswers } from './AnswerProvider';

function TestComponent() {
  const { answers, updateAnswer, clearAnswers, getFinalAnswerIndex, showHint, toggleHint } =
    useAnswers();
  return (
    <div>
      <button onClick={() => updateAnswer('1', 'A')}>Set Answer</button>
      <button onClick={clearAnswers}>Clear</button>
      <button onClick={toggleHint}>Toggle Hint</button>
      <span data-testid="answer">{answers['1']}</span>
      <span data-testid="final-index">{getFinalAnswerIndex()}</span>
      <span data-testid="show-hint">{showHint ? 'yes' : 'no'}</span>
    </div>
  );
}

describe('AnswersProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides and updates answers', () => {
    const { getByText, getByTestId } = render(
      <AnswersProvider testId="test1">
        <TestComponent />
      </AnswersProvider>,
    );
    act(() => {
      getByText('Set Answer').click();
    });
    expect(getByTestId('answer').textContent).toBe('A');
    expect(getByTestId('final-index').textContent).toBe('1');
  });

  it('clears answers', () => {
    const { getByText, getByTestId } = render(
      <AnswersProvider testId="test2">
        <TestComponent />
      </AnswersProvider>,
    );
    act(() => {
      getByText('Set Answer').click();
      getByText('Clear').click();
    });
    expect(getByTestId('answer').textContent).toBe('');
    expect(getByTestId('final-index').textContent).toBe('-1');
  });

  it('toggles showHint', () => {
    const { getByText, getByTestId } = render(
      <AnswersProvider testId="test3">
        <TestComponent />
      </AnswersProvider>,
    );
    expect(getByTestId('show-hint').textContent).toBe('no');
    act(() => {
      getByText('Toggle Hint').click();
    });
    expect(getByTestId('show-hint').textContent).toBe('yes');
  });
});
