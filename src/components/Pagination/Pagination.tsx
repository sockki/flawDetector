'use client';

import PaginationArrow from '@/public/icons/paginationArrow.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type PaginationProps = {
  nowPage: number;
  totalPage: number;
  name: string;
};

export default function Pagination({ nowPage, totalPage, name }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(nowPage);
  const pageContent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const router = useRouter();
  const firstNum = currentPage - (((currentPage - 1) % 10) + 1) + 1;
  return (
    <div className="flex w-fit gap-[0.8rem]">
      <button
        type="button"
        className="flex h-[2rem] w-[2rem] items-center justify-center bg-none text-[1.4rem] font-[400]"
        onClick={() => {
          setCurrentPage(nowPage - 1);
          router.push(`/${name}/${nowPage - 1}`);
        }}
        disabled={nowPage === 1}
      >
        <PaginationArrow className="rotate-180" />
      </button>
      {pageContent.map(i =>
        firstNum + i <= totalPage ? (
          <button
            type="button"
            key={i + 1}
            className={twMerge(
              'flex h-[2rem] w-[2rem] items-center justify-center bg-none text-[1.4rem] font-[400]',
              firstNum + i === nowPage ? 'text-primary-300' : '',
            )}
            onClick={() => {
              router.push(`/${name}/${firstNum + i}`);
            }}
          >
            {firstNum + i}{' '}
          </button>
        ) : null,
      )}
      <button
        className="flex h-[2rem] w-[2rem] items-center justify-center bg-none text-[1.4rem] font-[400]"
        type="button"
        onClick={() => {
          setCurrentPage(nowPage + 1);
          router.push(`/${name}/${nowPage + 1}`);
        }}
        disabled={nowPage === totalPage}
      >
        <PaginationArrow />
      </button>
    </div>
  );
}
