import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudioPlayer from './AudioPlayer';

jest.mock('../ui/Button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));
jest.mock('lucide-react', () => ({
  Pause: () => <span data-testid="pause-icon">Pause</span>,
  Play: () => <span data-testid="play-icon">Play</span>,
  TriangleAlert: () => <span data-testid="alert-icon">Error</span>,
  Loader: (props: any) => (
    <span data-testid="loader-icon" {...props}>
      Loading
    </span>
  ),
}));
jest.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as any;

describe('AudioPlayer', () => {
  let originalConsoleError: typeof console.error;
  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      if (typeof args[0] === 'string' && args[0].includes('Not implemented:')) {
        return;
      }
      originalConsoleError(...args);
    };
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //   it('renders play button and progress bar when src is provided', async () => {
  //     await act(async () => {
  //       render(<AudioPlayer src="test.mp3" />);
  //     });
  //     const playBtn = screen.getByRole('button', { name: /play audio/i });
  //     expect(playBtn).toBeInTheDocument();
  //     expect(playBtn).toContainElement(screen.getByTestId('play-icon'));
  //     expect(playBtn).toBeEnabled();
  //     expect(
  //       screen.getByText((content, node) => !!node && node.className?.includes('bg-blue-500')),
  //     ).toBeInTheDocument();
  //     // Simulate play to show pause icon
  //     fireEvent.click(playBtn);
  //     expect(playBtn).toContainElement(screen.getByTestId('pause-icon'));
  //   });

  it('shows loader while fetching audio', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));
    await act(async () => {
      render(<AudioPlayer src="test.mp3" />);
    });
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });

  //   it('shows error icon when fetch fails', async () => {
  //     (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  //     await act(async () => {
  //       render(<AudioPlayer src="bad.mp3" />);
  //     });
  //     // Wait for alert icon to appear
  //     await waitFor(() => expect(screen.getByTestId('alert-icon')).toBeInTheDocument());
  //   });

  it('renders controls but no audio element if src is null', async () => {
    await act(async () => {
      render(<AudioPlayer src={null} />);
    });
    expect(screen.getByRole('button', { name: /play audio/i })).toBeInTheDocument();
    expect(screen.getByTestId('play-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument();
    expect(document.querySelector('audio')).toBeNull();
  });

  it('toggles play/pause when button is clicked', async () => {
    await act(async () => {
      render(<AudioPlayer src="test.mp3" />);
    });
    // Mock HTMLAudioElement prototype
    let isPaused = true;
    const playMock = jest.fn(() => {
      isPaused = false;
      return Promise.resolve();
    });
    const pauseMock = jest.fn(() => {
      isPaused = true;
      return Promise.resolve();
    });
    Object.defineProperty(window.HTMLAudioElement.prototype, 'paused', { get: () => isPaused });
    window.HTMLAudioElement.prototype.play = playMock;
    window.HTMLAudioElement.prototype.pause = pauseMock;
    const btn = screen.getByRole('button', { name: /play audio/i });
    fireEvent.click(btn);
    expect(playMock).toHaveBeenCalled();
    fireEvent.click(btn);
    expect(pauseMock).toHaveBeenCalled();
  });
});
