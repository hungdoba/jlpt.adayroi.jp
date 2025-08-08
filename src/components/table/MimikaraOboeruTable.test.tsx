import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MimikaraOboeruTable } from './MimikaraOboeruTable';

const data = [
  { id: 1, kanji: '勉強', kana: 'べんきょう', meaning: 'study', unit: 1, kanvi: 'miễn cưỡng' },
  { id: 2, kanji: '先生', kana: 'せんせい', meaning: 'teacher', unit: 1, kanvi: 'tiên sinh' },
];

describe('MimikaraOboeruTable', () => {
  it('renders table with data', () => {
    const { getByText } = render(<MimikaraOboeruTable data={data} />);
    expect(getByText('No.')).toBeInTheDocument();
    expect(getByText('Kanji')).toBeInTheDocument();
    expect(getByText('Hán Việt')).toBeInTheDocument();
    expect(getByText('Cách đọc')).toBeInTheDocument();
    expect(getByText('Nghĩa')).toBeInTheDocument();
    expect(getByText('Unit')).toBeInTheDocument();
  });
});
