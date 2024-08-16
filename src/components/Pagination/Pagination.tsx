'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type PaginationProps = {
  nowPage: number;
  totalPage: number;
  name: string;
};

export default function Pagination({ nowPage, totalPage, name }: PaginationProps) {
  const pageNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const router = useRouter();
  const firstNum = nowPage - (((nowPage - 1) % 10) + 1) + 1;
  return (
    <div className="flex w-fit gap-[0.8rem]">
      <button
        type="button"
        className="flex h-[2rem] w-[2rem] items-center justify-center bg-none text-[1.4rem] font-[400]"
        onClick={() => {
          router.push(`/${name}/${nowPage - 1}`);
        }}
        disabled={nowPage === 1}
      >
        <PaginationArrow className="rotate-180" />
      </button>
      {pageNumber.map(number =>
        firstNum + number <= totalPage ? (
          <button
            type="button"
            key={number + 1}
            className={twMerge(
              'flex justify-center items-center w-[2rem] h-[2rem] bg-none text-[1.4rem] font-[400]',
              firstNum + number === nowPage ? 'text-primary-300' : '',
            )}
            onClick={() => {
              router.push(`/${name}/${firstNum + number}`);
            }}
          >
            {firstNum + number}{' '}
          </button>
        ) : null,
      )}
      <button
        className="flex h-[2rem] w-[2rem] items-center justify-center bg-none text-[1.4rem] font-[400]"
        type="button"
        onClick={() => {
          router.push(`/${name}/${nowPage + 1}`);
        }}
        disabled={nowPage === totalPage}
      >
        <PaginationArrow />
      </button>
    </div>
  );
}
