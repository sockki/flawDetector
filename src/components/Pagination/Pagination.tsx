'use client';

import { PaginationArrowIcon } from '@/public/index';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { twMerge } from 'tailwind-merge';

type PaginationProps = {
  nowPage: number;
  totalPage: number;
};

export default function Pagination({ nowPage, totalPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const firstNumber = nowPage - (((nowPage - 1) % 10) + 1) + 1;

  if (totalPage === 1) {
    return null;
  }

  return (
    <div className="flex w-fit gap-[1.3rem]">
      {nowPage > 1 && (
        <button
          type="button"
          className="flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-none text-[1.6rem] font-regular text-gray-black hover:bg-purple-light"
          onClick={() => {
            params.set('page', String(nowPage - 1));
            router.replace(`${pathname}?${params.toString()}`);
          }}
          disabled={nowPage === 1}
        >
          <PaginationArrowIcon className="rotate-180" />
        </button>
      )}
      {Array.from({ length: 10 }, (_, number) => number).map(
        pageNumber =>
          firstNumber + pageNumber <= totalPage && (
            <button
              type="button"
              key={pageNumber + 1}
              className={twMerge(
                'flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-none text-[1.6rem] font-regular text-gray-black hover:bg-purple-light',
                firstNumber + pageNumber === nowPage ? 'text-primary-300' : '',
              )}
              onClick={() => {
                params.set('page', String(firstNumber + pageNumber));
                router.replace(`${pathname}?${params.toString()}`);
              }}
            >
              {firstNumber + pageNumber}
            </button>
          ),
      )}
      {nowPage < totalPage && (
        <button
          className="flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-none text-[1.6rem] font-regular text-gray-black hover:bg-purple-light"
          type="button"
          onClick={() => {
            params.set('page', String(nowPage + 1));
            router.replace(`${pathname}?${params.toString()}`);
          }}
          disabled={nowPage === totalPage}
        >
          <PaginationArrowIcon />
        </button>
      )}
    </div>
  );
}
