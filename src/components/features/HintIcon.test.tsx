import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HintIcon from './HintIcon';

const getIcon = (container: HTMLElement) => container.querySelector('svg');

describe('HintIcon', () => {
  it('renders LightbulbOff by default', () => {
    const { container } = render(<HintIcon />);
    const icon = getIcon(container);
    expect(icon).toBeTruthy();
    expect(icon?.className.baseVal).toContain('lucide-lightbulb-off');
  });

  it('renders Lightbulb when showHint is true', () => {
    const { container } = render(<HintIcon showHint={true} />);
    const icon = getIcon(container);
    expect(icon).toBeTruthy();
    expect(icon?.className.baseVal).toContain('lucide-lightbulb');
  });

  it('toggles icon on click', () => {
    const { container } = render(<HintIcon />);
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
    // Initially off
    let icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-lightbulb-off');
    // Click to turn on
    fireEvent.click(div!);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-lightbulb');
    // Click to turn off
    fireEvent.click(div!);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-lightbulb-off');
  });

  it('calls onClick with correct status', () => {
    const onClick = jest.fn();
    const { container } = render(<HintIcon onClick={onClick} />);
    const div = container.querySelector('div');
    fireEvent.click(div!);
    expect(onClick).toHaveBeenCalledWith(true);
    fireEvent.click(div!);
    expect(onClick).toHaveBeenCalledWith(false);
  });

  it('updates icon when showHint prop changes', () => {
    const { rerender, container } = render(<HintIcon showHint={false} />);
    let icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-lightbulb-off');
    rerender(<HintIcon showHint={true} />);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-lightbulb');
  });
});
