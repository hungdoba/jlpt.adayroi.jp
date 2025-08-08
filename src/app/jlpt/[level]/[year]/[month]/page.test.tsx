import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import * as jlptLib from '@/lib/jlpt';
import * as nextNavigation from 'next/navigation';

jest.mock('@/lib/jlpt', () => ({
  getJlptListFromDir: jest.fn(() => Promise.resolve({ level: ['n1'], year: [2024], month: [6] })),
  readJlptJson: jest.fn(() =>
    Promise.resolve([
      { mondais: [{ id: 1 }], name: 'Section 1', description: '', skill: '', part: '' },
    ]),
  ),
}));
jest.mock('@/components/cards/MondaiTitle', () => {
  const MockMondaiTitle = () => <div data-testid="mondai-title">MondaiTitle</div>;
  MockMondaiTitle.displayName = 'MockMondaiTitle';
  return MockMondaiTitle;
});
jest.mock('@/components/cards/MondaiCard', () => {
  const MockMondaiCard = () => <div data-testid="mondai-card">MondaiCard</div>;
  MockMondaiCard.displayName = 'MockMondaiCard';
  return MockMondaiCard;
});
jest.mock('@/components/features/MenuJlpt', () => ({
  MenuJlpt: () => <div data-testid="menu-jlpt">MenuJlpt</div>,
}));

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    notFound: jest.fn(() => {
      throw new Error('notFound');
    }),
  };
});

describe('JLPT Page', () => {
  it('renders sections and mondai cards', async () => {
    const params = Promise.resolve({ level: 'n1', year: '2024', month: '6' });
    render(await Page({ params }));
    expect(screen.getByTestId('mondai-title')).toBeInTheDocument();
    expect(screen.getByTestId('mondai-card')).toBeInTheDocument();
    expect(screen.getByTestId('menu-jlpt')).toBeInTheDocument();
  });

  it('calls notFound when no data is returned', async () => {
    (jlptLib.readJlptJson as jest.Mock).mockResolvedValueOnce([]);
    const params = Promise.resolve({ level: 'n1', year: '2024', month: '6' });
    try {
      await Page({ params });
    } catch (e) {
      // expected error from notFound mock
    }
    expect(nextNavigation.notFound).toHaveBeenCalled();
  });
});
