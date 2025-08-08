import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizPagination from './QuizPagination';

describe('QuizPagination', () => {
  it('renders pagination links', () => {
    const { getByText } = render(
      <QuizPagination pageNumber={2} itemsPerPage={5} itemsCount={15} />,
    );
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  it('renders previous and next links', () => {
    const { getByText } = render(
      <QuizPagination pageNumber={2} itemsPerPage={5} itemsCount={15} />,
    );
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });
});
