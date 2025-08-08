import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('../features/Logo', () => {
  const MockLogo = () => <div data-testid="logo">Logo</div>;
  MockLogo.displayName = 'MockLogo';
  return MockLogo;
});
jest.mock('../features/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <button>ThemeSwitcher</button>,
}));
jest.mock('../ui/Button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));
jest.mock('../ui/Sheet', () => ({
  Sheet: ({ children }: any) => <div>{children}</div>,
  SheetClose: ({ children }: any) => <div>{children}</div>,
  SheetContent: ({ children }: any) => <div>{children}</div>,
  SheetDescription: ({ children }: any) => <div>{children}</div>,
  SheetHeader: ({ children }: any) => <div>{children}</div>,
  SheetTitle: ({ children }: any) => <div>{children}</div>,
  SheetTrigger: ({ children }: any) => <div>{children}</div>,
}));

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getAllByText('News').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Chat').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Trips').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Blog').length).toBeGreaterThanOrEqual(2);
  });

  it('renders ThemeSwitcher', () => {
    render(<Navbar />);
    expect(screen.getAllByText('ThemeSwitcher').length).toBeGreaterThanOrEqual(1);
  });

  it('renders mobile menu button', () => {
    render(<Navbar />);
    expect(screen.getByText('Toggle menu')).toBeInTheDocument();
  });

  it('renders menu content', () => {
    render(<Navbar />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Navigate to different sections')).toBeInTheDocument();
  });
});
