import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('../ui/DropdownMenu', () => ({
  DropdownMenu: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: React.PropsWithChildren<object>) => (
    <div data-testid="dropdown-content">{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) => (
    <button onClick={onClick}>{children}</button>
  ),
  DropdownMenuTrigger: ({ children }: React.PropsWithChildren<object>) => <div>{children}</div>,
}));
jest.mock('../ui/Button', () => ({
  Button: ({
    children,
    ...props
  }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{children}</button>
  ),
}));

describe('ThemeSwitcher', () => {
  it('renders theme options', async () => {
    jest.resetModules();
    jest.doMock('next-themes', () => ({
      useTheme: () => ({ setTheme: jest.fn() }),
    }));
    const { ThemeSwitcher } = await import('./ThemeSwitcher');
    render(<ThemeSwitcher />);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('calls setTheme when theme options are clicked', async () => {
    jest.resetModules();
    const setTheme = jest.fn();
    jest.doMock('next-themes', () => ({
      useTheme: () => ({ setTheme }),
    }));
    const { ThemeSwitcher } = await import('./ThemeSwitcher');
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByText('Light'));
    expect(setTheme).toHaveBeenCalledWith('light');
    fireEvent.click(screen.getByText('Dark'));
    expect(setTheme).toHaveBeenCalledWith('dark');
    fireEvent.click(screen.getByText('System'));
    expect(setTheme).toHaveBeenCalledWith('system');
  });
});
