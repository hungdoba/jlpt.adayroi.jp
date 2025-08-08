import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OptionGroup from './OptionGroup';

describe('OptionGroup', () => {
  it('renders without crashing', () => {
    const options = [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
    ];
    render(<OptionGroup options={options} />);
  });
});
