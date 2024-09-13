'use client';

import { PaginationArrowIcon } from '@/public/index';
import { usePathname, useRouter } from 'next/navigation';

import { twMerge } from 'tailwind-merge';

type PaginationProps = {
  nowPage: number;
  totalPage: number;
  label?: string;
};

export default function Pagination({ nowPage, totalPage, label }: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const firstNumber = nowPage - (((nowPage - 1) % 10) + 1) + 1;
  return (
    <div className="flex w-fit gap-[1.3rem]">
      <button
        type="button"
        className="flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-none text-[1.6rem] font-regular text-gray-black hover:bg-purple-light"
        onClick={() => {
          router.push(`${pathname}?${label ? `label=${label}&` : ''}page=${nowPage - 1}`);
        }}
        disabled={nowPage === 1}
      >
        <PaginationArrowIcon className="rotate-180" />
      </button>
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
                router.push(
                  `${pathname}?${label ? `label=${label}&` : ''}page=${firstNumber + pageNumber}`,
                );
              }}
            >
              {firstNumber + pageNumber}
            </button>
          ),
      )}
      <button
        className="flex h-[3.6rem] w-[3.6rem] items-center justify-center bg-none text-[1.6rem] font-regular text-gray-black hover:bg-purple-light"
        type="button"
        onClick={() => {
          router.push(`${pathname}?${label ? `label=${label}&` : ''}page=${nowPage + 1}`);
        }}
        disabled={nowPage === totalPage}
      >
        <PaginationArrowIcon />
      </button>
    </div>
  );
}
