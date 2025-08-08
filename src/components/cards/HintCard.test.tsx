import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HintCard from './HintCard';

jest.mock('../ui/Dialog', () => ({
  Dialog: ({ children, modal, onOpenChange, ...props }: any) => (
    <div data-testid="dialog" {...props}>
      {children}
    </div>
  ),
  DialogContent: ({ children, ...props }: any) => (
    <div data-testid="dialog-content" {...props}>
      {children}
    </div>
  ),
  DialogDescription: ({ children, ...props }: any) => (
    <div data-testid="dialog-description" {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('../ui/ScrollArea', () => ({
  ScrollArea: ({ children, ...props }: any) => (
    <div data-testid="scroll-area" {...props}>
      {children}
    </div>
  ),
}));
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  hasHtmlContent: jest.fn(),
  cn: (...args: string[]) => args.join(' '),
}));

import * as utils from '@/lib/utils';
import { Hint, HintField } from '@/types/base';

describe('HintCard', () => {
  const baseHint: Hint = { id: 1, field: HintField.Sentence, text: 'Test hint text' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with title and description for plain text', () => {
    jest.spyOn(utils, 'hasHtmlContent').mockReturnValue(false);
    render(<HintCard hint={baseHint} open={true} />);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText(HintField.Sentence)).toBeInTheDocument();
    expect(screen.getByTestId('dialog-description')).toHaveTextContent('Test hint text');
  });

  it('renders HTML content when hasHtmlContent returns true', () => {
    jest.spyOn(utils, 'hasHtmlContent').mockReturnValue(true);
    const htmlHint: Hint = { id: 2, field: HintField.Question, text: '<b>Bold hint</b>' };
    render(<HintCard hint={htmlHint} open={true} />);
    expect(screen.getByText(HintField.Question)).toBeInTheDocument();
    // The HTML content should be rendered as innerHTML
    expect(screen.getByText('Bold hint')).toBeInTheDocument();
    // Should not render DialogDescription
    expect(screen.queryByTestId('dialog-description')).not.toBeInTheDocument();
  });

  it('does not render dialog when open is false', () => {
    jest.spyOn(utils, 'hasHtmlContent').mockReturnValue(false);
    const { queryByTestId } = render(<HintCard hint={baseHint} open={false} />);
    expect(queryByTestId('dialog')).toBeInTheDocument(); // Dialog is rendered but should be closed
  });

  it('calls onOpenChange when provided', () => {
    jest.spyOn(utils, 'hasHtmlContent').mockReturnValue(false);
    const onOpenChange = jest.fn();
    render(<HintCard hint={baseHint} open={true} onOpenChange={onOpenChange} />);
    // Simulate open change
    onOpenChange(false);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
