import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JlptDataTable from './JlptDataTable';

describe('JlptDataTable', () => {
  const jlptList = [
    {
      id: 1,
      level: 'n1' as const,
      year: 2024,
      month: 6 as const,
      totalQuestions: 60,
    },
    {
      id: 2,
      level: 'n2' as const,
      year: 2023,
      month: 12 as const,
      totalQuestions: 55,
    },
  ];

  it('renders table with JLPT data', () => {
    render(<JlptDataTable jlptList={jlptList} />);
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Năm')).toBeInTheDocument();
    expect(screen.getByText('Tháng')).toBeInTheDocument();
    expect(screen.getByText('Số câu hỏi')).toBeInTheDocument();
    expect(screen.getByText('n1')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});
