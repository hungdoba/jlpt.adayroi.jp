import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import { readJsonFile } from '@/lib/mimikara';

jest.mock('@/lib/mimikara', () => ({
  readJsonFile: jest.fn(() =>
    Promise.resolve([
      { id: 1, kanji: '勉強', kana: 'べんきょう', meaning: 'study', unit: 1, kanvi: 'miễn cưỡng' },
    ]),
  ),
}));
jest.mock('@/components/table/MimikaraOboeruTable', () => ({
  MimikaraOboeruTable: ({ data }: any) => <div data-testid="mimikara-table">{data[0].kanji}</div>,
}));

describe('Mimikara Oboeru Page', () => {
  it('renders table with data', async () => {
    const params = Promise.resolve({ level: 'n1' });
    render(await Page({ params }));
    expect(screen.getByTestId('mimikara-table')).toHaveTextContent('勉強');
  });

  it('renders "Data not found" when no data is returned', async () => {
    (readJsonFile as jest.Mock).mockResolvedValueOnce(null);
    const params = Promise.resolve({ level: 'n1' });
    render(await Page({ params }));
    expect(screen.getByText(/Data not found/)).toBeInTheDocument();
    expect(screen.getByText(/Data not found/)).toBeInTheDocument();
  });
});
