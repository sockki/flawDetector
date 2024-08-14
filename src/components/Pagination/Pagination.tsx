'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import paginationArrow from '@/public/icons/paginationArrow.svg';

type PaginationProps = {
  nowPage: number;
  totalPage: number;
  setNowPage: React.Dispatch<React.SetStateAction<number>>;
  name: string;
};

export default function Pagination({ nowPage, totalPage, setNowPage, name }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(nowPage);
  const router = useRouter();
  const firstNum = currentPage - (((currentPage - 1) % 10) + 1) + 1;
  return (
    <div className="flex w-fit gap-[0.8rem]">
      <button
        type="button"
        className="flex justify-center items-center w-[2rem] h-[2rem] bg-none text-[1.4rem] font-[400]"
        onClick={() => {
          setNowPage(nowPage - 1);
          setCurrentPage(nowPage - 1);
          router.push(`/${name}/${nowPage - 1}`);
        }}
        disabled={nowPage === 1}
      >
        <Image src={paginationArrow} className="rotate-180" alt="leftArrow" />
      </button>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i =>
        firstNum + i <= totalPage ? (
          <button
            type="button"
            key={i + 1}
            className={twMerge(
              'flex justify-center items-center w-[2rem] h-[2rem] bg-none text-[1.4rem] font-[400]',
              firstNum + i === nowPage ? 'text-primary-300' : '',
            )}
            onClick={() => {
              setNowPage(firstNum + i);
              router.push(`/${name}/${firstNum + i}`);
            }}
          >
            {firstNum + i}{' '}
          </button>
        ) : null,
      )}
      <button
        className="flex justify-center items-center w-[2rem] h-[2rem] bg-none text-[1.4rem] font-[400]"
        type="button"
        onClick={() => {
          setNowPage(nowPage + 1);
          setCurrentPage(nowPage + 1);
          router.push(`/${name}/${nowPage + 1}`);
        }}
        disabled={nowPage === totalPage}
      >
        <Image src={paginationArrow} alt="rightArrow" />
      </button>
    </div>
  );
}
