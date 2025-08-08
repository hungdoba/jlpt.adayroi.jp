import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Toaster } from 'sonner';
import Providers from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const noto_sans_jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JLPT - Adayroi',
  description:
    'Tài liệu ôn thi JLPT miễn phí, đề thi JLPT miễn phí, từ vựng JLPT miễn phí, kanji JLPT miễn phí',
  metadataBase: new URL('https://jlpt.adayroi.jp'),
  openGraph: {
    title: 'JLPT - Adayroi',
    description:
      'Tài liệu ôn thi JLPT miễn phí, đề thi JLPT miễn phí, từ vựng JLPT miễn phí, kanji JLPT miễn phí',
    url: 'https://jlpt.adayroi.jp',
    siteName: 'JLPT - Adayroi',
    images: [
      {
        url: 'https://jlpt.adayroi.jp/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'JLPT - Adayroi',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JLPT - Adayroi',
    description:
      'Tài liệu ôn thi JLPT miễn phí, đề thi JLPT miễn phí, từ vựng JLPT miễn phí, kanji JLPT miễn phí',
    images: ['https://jlpt.adayroi.jp/images/logo.png'],
    creator: '@adayroi',
    site: '@adayroi',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  appleWebApp: {
    title: 'JLPT - Adayroi',
    statusBarStyle: 'default',
    capable: true,
    startupImage: [
      {
        url: '/images/logo.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  alternates: {
    canonical: 'https://jlpt.adayroi.jp',
    // TODO: Uncomment when RSS feed is available
    // types: {
    //   'application/rss+xml': '/feed.xml',
    //   'application/atom+xml': '/feed.atom',
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${noto_sans_jp.className} antialiased scroll-smooth`}>
        <Providers>
          <div className="md:container mx-auto w-full md:max-w-6xl p-4">
            <Navbar />
            {children}
            <Toaster richColors />
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-JGEEVQ22ED" />
    </html>
  );
}
