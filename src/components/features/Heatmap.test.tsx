import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GitHubHeatmap from './Heatmap';

jest.mock('react-calendar-heatmap', () => {
  const MockHeatmap = () => <div data-testid="calendar-heatmap">Mock Heatmap</div>;
  MockHeatmap.displayName = 'MockHeatmap';
  return MockHeatmap;
});
jest.mock('@/lib/localStorage', () => ({
  fetchHeatmapData: () => ({}),
  saveHeatmapData: jest.fn(),
}));

describe('GitHubHeatmap', () => {
  it('renders heatmap component', () => {
    const { getByTestId } = render(<GitHubHeatmap />);
    expect(getByTestId('calendar-heatmap')).toBeInTheDocument();
  });
});
