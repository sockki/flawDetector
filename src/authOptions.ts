import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GIT_CLIENT_ID || '',
      clientSecret: process.env.GIT_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url === '/' ? baseUrl : `${baseUrl}/repos`;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : null,
          refreshToken: account.refresh_token,
          id: profile.id,
          login: profile.login,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.id,
          login: token.login,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
