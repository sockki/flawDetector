'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { Ellipse } from '@/components/Ellipse';

export default function NonLoginReposPage() {
  const router = useRouter();

  const handleLoginButton = () => router.push('/login');

  return (
    <div className="relative w-full overflow-hidden">
      <Ellipse />

      <section className="min-h-screen content-center">
        <div className="flex flex-col items-center gap-[6.5rem] text-primary-500">
          <div className="flex flex-col items-center justify-center gap-[4rem]">
            <h2 className="text-[6rem] font-[300] text-primary-500">containing code files</h2>
            <Link
              href="/repos"
              className="flex h-[11rem] items-center gap-[1rem] rounded-full border-[0.4rem] border-primary-500 bg-white px-[4rem] text-center text-[6rem] text-primary-500"
            >
              My Library
            </Link>
            <p className="text-[2rem] font-regular text-primary-500">
              깃허브와 연동하여 내 코드 파일을 불러오세요.
            </p>
          </div>
          <Button onClick={handleLoginButton}>Login</Button>
        </div>
      </section>
    </div>
  );
}
