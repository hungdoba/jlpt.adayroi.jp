import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adayroi - Vietnamese news in Japan',
  description:
    'Các thông tin thời sự mới nhất liên quan đến Việt Nam tại Nhật Bản',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${roboto_mono.className} antialiased`}>
        <Providers>
          <div className="md:container mx-auto w-full md:max-w-6xl">
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
