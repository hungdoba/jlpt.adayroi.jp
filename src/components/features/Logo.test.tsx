import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('next/image', () => {
  // Extend props type to include 'priority'
  type ImgPropsWithPriority = React.ComponentProps<'img'> & { priority?: boolean };
  const MockNextImage = (props: ImgPropsWithPriority) => {
    // Remove 'priority' prop to avoid React warning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, ...rest } = props;
    // Render a simple img for testing
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...rest} />;
  };
  MockNextImage.displayName = 'MockNextImage';
  return MockNextImage;
});

describe('Logo', () => {
  it('renders the light logo by default', () => {
    const { getByAltText: getByAltTextLight } = render(<Logo />);
    const img = getByAltTextLight('Logo') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/images/logo.png');
  });

  it('renders the dark logo when theme is dark', async () => {
    jest.resetModules();
    jest.doMock('next-themes', () => ({
      useTheme: () => ({ theme: 'dark' }),
    }));
    // Re-import after mocking
    const { default: LogoDark } = await import('./Logo');
    const { getByAltText: getByAltTextDark } = render(<LogoDark />);
    const img = getByAltTextDark('Logo') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/images/logo-dark.png');
  });
});
