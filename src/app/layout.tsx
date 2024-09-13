import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import '@/styles/globals.css';
import ClientSessionProvider from '@/utils/clientSessionProvider';
import Providers from '@/utils/provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '플로디텍터 | FlawDetector',
  description: '쉽고 편하게 취약점을 발견하다',
  icons: {
    icon: '/icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientSessionProvider>
          <Providers>
            <div id="modal" />
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </Providers>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
