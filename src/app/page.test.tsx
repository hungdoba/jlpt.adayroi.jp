import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

jest.mock('@/lib/jlpt', () => ({
  getJlptInfo: jest.fn(() => Promise.resolve([])),
}));
jest.mock('@/components/table/JlptDataTable', () => {
  const MockJlptDataTable = () => <div data-testid="jlpt-table">JLPT Table</div>;
  MockJlptDataTable.displayName = 'MockJlptDataTable';
  return MockJlptDataTable;
});
jest.mock('@/components/features/Heatmap', () => {
  const MockHeatmap = () => <div data-testid="heatmap">Heatmap</div>;
  MockHeatmap.displayName = 'MockHeatmap';
  return MockHeatmap;
});

// Mock next/link for testing
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

describe('Home page', () => {
  it('renders main sections and components', async () => {
    render(await Home());
    expect(screen.getByText('Đề thi kỹ năng')).toBeInTheDocument();
    expect(screen.getByText('Tuyển tập đề thi JLPT')).toBeInTheDocument();
    expect(screen.getByTestId('jlpt-table')).toBeInTheDocument();
    expect(screen.getByText('Tài liệu')).toBeInTheDocument();
    expect(screen.getByTestId('heatmap')).toBeInTheDocument();
    expect(screen.getByText('Độ chăm chỉ')).toBeInTheDocument();
  });
});
