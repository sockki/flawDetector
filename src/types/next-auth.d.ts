// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      login?: string | null;
    };
    accessToken?: string;
    error?: string;
  }

  interface User {
    id: string;
    login: string;
  }

  interface Account {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
  }

  interface Profile {
    id: string;
    login: string;
    email: string;
    avatar_url: string;
    name?: string;
  }
}
