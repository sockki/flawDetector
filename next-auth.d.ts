declare module 'next-auth' {
  type Session = {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
    error?: string;
  };

  type User = {
    id: string;
  };

  type Account = {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
  };

  type Profile = {
    id: string;
    login: string;
    email: string;
    avatar_url: string;
    name?: string;
  };
}
