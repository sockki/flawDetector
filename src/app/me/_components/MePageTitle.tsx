'use client';

import { useRouter } from 'next/navigation';
import { BackIcon } from '@/public/index';

type MePageTitleProps = {
  title: string;
};

export default function MePageTitle({ title }: MePageTitleProps) {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleClickBack}
      type="button"
      className="flex w-fit items-center gap-[2.4rem] rounded-full border-[0.4rem] border-primary-500 bg-white px-[1.6rem] py-[1.2rem]"
    >
      <BackIcon className="h-[3.6rem] w-[3.6rem]" />
      <h2 className="text-[4rem] font-regular leading-[4.8rem] tracking-[-0.01rem] text-primary-500">
        {title}
      </h2>
    </button>
  );
}
