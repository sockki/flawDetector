import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientSessionProvider from '@/components/ClientSessionProvider/ClientSessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GeekHub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div id="modal" />
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <ClientSessionProvider>{children}</ClientSessionProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
