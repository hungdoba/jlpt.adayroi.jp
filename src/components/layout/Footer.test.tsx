import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('adayroi')).toBeInTheDocument();
  });

  it('renders all footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Giới thiệu')).toBeInTheDocument();
    expect(screen.getByText('Chính sách bảo mật')).toBeInTheDocument();
    expect(screen.getByText('Liên hệ')).toBeInTheDocument();
    expect(screen.getByText('adayroi.jp')).toBeInTheDocument();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/All Rights Reserved/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });
});
