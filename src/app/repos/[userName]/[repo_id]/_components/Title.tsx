'use client';

import { LeftIcon } from '@/public/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Title() {
  const PathName = usePathname();
  const repoName = PathName.split('/')[3];
  const repoIconStyles =
    'flex h-[7.9rem] w-[7.9rem] items-center justify-center rounded-full border-[0.4rem] border-primary-500';
  const titleStyles =
    'h-[7.9rem] w-[166.4rem] flex items-center gap-[2.4rem] rounded-full border-[0.4rem] border-primary-500 bg-white p-[2rem] text-[4rem] text-primary-500';
  return (
    <div className="flex items-center gap-[1.6rem]">
      <Link href="/repos" className={repoIconStyles}>
        <LeftIcon />
      </Link>
      <div className={titleStyles}>{repoName}</div>
    </div>
  );
}
