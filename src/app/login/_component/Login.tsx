'use client';

import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';
import { GithubCatIcon } from '@/public/index';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  const handleGithubLoginButton = () => {
    signIn('github');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Ellipse />
      <div className="flex min-h-screen flex-col items-center justify-center gap-[10rem]">
        <div className="flex flex-col items-center gap-[2rem]">
          <h1 className="text-[6rem] font-regular text-primary-500">Find your Flaw,</h1>
          <h2 className="w-fit rounded-full border-[0.4rem] border-primary-500 bg-white px-[4rem] text-[6rem] font-regular text-primary-500">
            Login
          </h2>
        </div>
        <div className="flex flex-col gap-[4rem]">
          <Button type="button" variant="filled" onClick={handleGithubLoginButton}>
            <GithubCatIcon className="mr-[1.6rem] fill-white" />
            GitHub로 로그인하기
          </Button>
          <Button asChild variant="tonal">
            <GithubCatIcon className="mr-[1.6rem] fill-primary-400" />
            <Link href="https://github.com/">Github로 이동하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
