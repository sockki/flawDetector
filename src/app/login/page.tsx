'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';

export default function LoginPage() {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleGithubLoginButton = () => {
    signIn('github');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Ellipse />
      <div className="flex min-h-screen items-center justify-center gap-[24.6rem]">
        <div className="flex flex-col items-center gap-[2rem]">
          <h1 className="text-[6rem] font-regular text-primary-500">Find your Flaw,</h1>
          <h2 className="w-fit rounded-full border-[0.4rem] border-primary-500 bg-white px-[4rem] text-[6rem] font-regular text-primary-500">
            Login
          </h2>
        </div>
        <Button type="button" onClick={handleGithubLoginButton}>
          GitHub로 연동 로그인하기
        </Button>
        <Link href="https://github.com/">
          <Button>Github</Button>
        </Link>
      </div>
    </div>
  );
}
