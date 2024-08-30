'use client';

import { BackIcon } from '@/public/index';
import { useRouter } from 'next/navigation';

type MyPageTitleProps = {
  title: string;
};

export default function MyPageTitle({ title }: MyPageTitleProps) {
  const router = useRouter();

  return (
    <div className="flex h-[7.9rem] w-fit flex-row items-center gap-[2.4rem] rounded-full border-[0.4rem] border-primary-500 bg-white p-[2rem]">
      <button onClick={() => router.back()} type="button">
        <BackIcon className="h-[3.6rem] w-[3.6rem] text-center" />
      </button>
      <h2 className="whitespace-nowrap text-center text-[4rem] font-regular leading-[4.8rem] tracking-[-0.01em] text-primary-500">
        {title}
      </h2>
    </div>
  );
}
