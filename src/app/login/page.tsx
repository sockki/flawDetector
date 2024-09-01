'use client';

import Button from '@/components/Button/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <h1>Hello, {session.user?.name}</h1>
        <p>Email: {session.user?.email}</p>
        <Button type="button" onClick={() => signOut()}>
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1>로그인</h1>
      <Button type="button" onClick={() => signIn('github')}>
        GitHub로 로그인
      </Button>
    </div>
  );
}
