'use client';

import Image from 'next/image';
import detectFileCardButton from '@/public/icons/detectFileCardButton.svg';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type DetectFileCardProps = {
  title: string;
  caption: string;
  detected: boolean;
};

export default function DetectFileCard({ caption, title, detected }: DetectFileCardProps) {
  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <div className="relative flex h-[20rem] w-[31rem] cursor-pointer flex-col justify-between rounded-[1.2rem] border-[0.1rem] border-primary-100 hover:bg-primary-100">
      <div className="flex items-center justify-between p-[2rem]">
        <label
          className={twMerge(
            'flex h-[3rem] w-[6rem] items-center justify-center rounded-full border-[0.1rem] border-gray-text bg-white text-[1.6rem] font-regular',
            detected && 'border-primary-300 text-primary-500',
          )}
        >
          label
        </label>
        <button
          type="button"
          className="-mr-[1.3rem] flex h-[2rem] w-[3rem] items-center justify-center"
          onClick={() => setDropDown(prev => !prev)}
        >
          <Image src={detectFileCardButton} alt="detectFileCardButton" />
        </button>
      </div>
      {dropDown && (
        <div className="absolute right-[1.4rem] top-[5.7rem] grid h-[10.4rem] w-[7.7rem] grid-rows-2 rounded-[0.8rem] bg-white text-[2rem] font-medium leading-[2.8rem] text-gray-text shadow-[0px_4px_12px_0px_#00000014]">
          <button type="button">삭제</button>
          <button type="button">공유</button>
        </div>
      )}
      <div className="m-[2rem] flex flex-col gap-[1rem] font-regular">
        <span className="text-[2.8rem] leading-[3.389rem]">{title}</span>
        <span className="text-[1.6rem] leading-[1.6rem] text-gray-lightText">{caption}</span>
      </div>
    </div>
  );
}
