import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import '@/styles/globals.css';
import ClientSessionProvider from '@/utils/clientSessionProvider';
import Providers from '@/utils/provider';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

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
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('next-auth.session-token');
  const isLoggedIn = !!sessionCookie;

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="font-sans">
        <ClientSessionProvider>
          <Providers>
            <div id="modal" />
            <div className="flex min-h-screen flex-col">
              <Header isLoggedIn={isLoggedIn} />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </Providers>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
