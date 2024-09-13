'use client';

import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';
import LogoLoading from '@/components/common/Loading/LogoLoading';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div>
        <LogoLoading />
      </div>
    );
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
        <Button asChild>
          <Link href="https://github.com/">Github</Link>
        </Button>
      </div>
    </div>
  );
}
