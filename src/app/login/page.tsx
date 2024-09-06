'use client';

import Button from '@/components/Button/Button';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/repos');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center gap-[24.6rem] bg-[]">
      <div className="flex flex-col items-center gap-[2rem]">
        <h1 className="text-[6rem] font-regular text-primary-500">Find your Flaw,</h1>
        <h2 className="w-fit rounded-full border-[0.4rem] border-primary-500 bg-white px-[4rem] text-[6rem] font-regular text-primary-500">
          Login
        </h2>
      </div>
      <Button type="button" onClick={() => signIn('github')}>
        GitHub로 연동 로그인하기
      </Button>
      <Link href="https://github.com/">
        <Button>Github</Button>
      </Link>
    </div>
  );
}
