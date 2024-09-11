export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/repos/:userName/:path*', '/me/:path*'],
};
