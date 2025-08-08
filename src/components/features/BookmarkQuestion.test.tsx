import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookmarkQuestion from './BookmarkQuestion';
import { BookmarkStatus } from '@/types/bookmark';

// Helper to get the SVG icon element
const getIcon = (container: HTMLElement) => container.querySelector('svg');

describe('BookmarkQuestion', () => {
  it('renders with default status', () => {
    const { container } = render(<BookmarkQuestion />);
    const icon = getIcon(container);
    expect(icon).toBeTruthy();
    expect(icon?.className.baseVal).toContain('lucide-bookmark');
  });

  it('cycles through statuses on click', () => {
    const { container } = render(<BookmarkQuestion defaultStatus={BookmarkStatus.New} />);
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
    // Click 1: New -> Again
    fireEvent.click(div!);
    let icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark-x');
    // Click 2: Again -> Hard
    fireEvent.click(div!);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark-minus');
    // Click 3: Hard -> Good
    fireEvent.click(div!);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark-check');
    // Click 4: Good -> Easy
    fireEvent.click(div!);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark-plus');
    // Click 5: Easy -> New
    fireEvent.click(div!);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark');
  });

  it('calls onBookmarkChanged when status changes', () => {
    const onBookmarkChanged = jest.fn();
    const { container } = render(
      <BookmarkQuestion defaultStatus={BookmarkStatus.New} onBookmarkChanged={onBookmarkChanged} />,
    );
    const div = container.querySelector('div');
    fireEvent.click(div!);
    expect(onBookmarkChanged).toHaveBeenCalledWith(BookmarkStatus.Again);
  });

  it('resets to New on right click (context menu)', () => {
    const onBookmarkChanged = jest.fn();
    const { container } = render(
      <BookmarkQuestion
        defaultStatus={BookmarkStatus.Easy}
        onBookmarkChanged={onBookmarkChanged}
      />,
    );
    const div = container.querySelector('div');
    // Right click
    fireEvent.contextMenu(div!);
    expect(onBookmarkChanged).toHaveBeenCalledWith(BookmarkStatus.New);
  });

  it('updates status when defaultStatus prop changes', () => {
    const { rerender, container } = render(<BookmarkQuestion defaultStatus={BookmarkStatus.New} />);
    let icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark');
    rerender(<BookmarkQuestion defaultStatus={BookmarkStatus.Good} />);
    icon = getIcon(container);
    expect(icon?.className.baseVal).toContain('lucide-bookmark-check');
  });
});
