'use client';

import { DetectFileCardArrowIcon, DetectFileCardBugIcon, DetectFileCardStar } from '@/public/index';
import type { DetectFileCardProps, ElementByLabel } from '@/types/detectedFileCard';
import { format } from 'date-fns';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function DetectFileCard({ title, label, date, isBookmarked }: DetectFileCardProps) {
  const [isBookmark, setIsBookmark] = useState<boolean>(isBookmarked);

  const elementByLabel: ElementByLabel = {
    before: {
      labelStyle: '',
      labelText: '',
      buttonStyle: 'bg-primary-500',
      buttonText: '검사하기',
    },
    under: {
      labelStyle: 'bg-gray-light text-gray-default',
      labelText: '검사중',
      buttonStyle: 'bg-primary-500',
      buttonText: '검사하기',
    },
    done: {
      labelStyle: 'bg-primary-50 text-primary-500',
      labelText: '검사완료',
      buttonStyle: 'bg-neutral-100',
      buttonText: '결과보기',
    },
  };

  const { labelStyle, labelText, buttonStyle, buttonText } = elementByLabel[label];

  const onClickBookmark = () => {
    setIsBookmark(prev => !prev);
  };

  return (
    <div className="group relative flex h-[22.5rem] w-[31rem] cursor-pointer flex-col justify-between rounded-[1.2rem] border-[0.1rem] border-primary-100 p-[2rem]">
      <div
        onClick={onClickBookmark}
        className="absolute right-[2rem] flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.2rem] group-hover:border-[0.2rem] group-hover:border-primary-200"
      >
        <DetectFileCardStar
          className={twMerge(
            'ml-[0.15rem] mt-[0.15rem] h-[2.8rem] w-[2.8rem] group-hover:stroke-primary-200 group-hover:stroke-1',
            isBookmark ? 'fill-primary-200 stroke-primary-200 stroke-1' : '',
          )}
        />
      </div>
      <div className="flex flex-col gap-[0.4rem]">
        <label
          className={twMerge(
            'w-fit rounded-full px-[1.2rem] py-[0.8rem] text-[1.6rem] font-medium leading-[2.24rem]',
            labelStyle,
          )}
        >
          {labelText}
        </label>
        <div className="flex h-[3.9rem] items-center gap-[0.8rem]">
          <span className="text-[2.8rem] font-medium leading-[3.9rem] text-gray-black">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <button
          type="button"
          className={twMerge(
            'flex items-center gap-[0.7rem] rounded-[1.4rem] p-[1rem]',
            buttonStyle,
          )}
        >
          <DetectFileCardBugIcon />
          <span className="text-[2rem] font-regular leading-[2.8rem] text-white">{buttonText}</span>
          <DetectFileCardArrowIcon />
        </button>
        <span className="text-[1.6rem] font-medium leading-[2.24rem] text-gray-default">
          {format(date, 'yy.MM.dd')}
        </span>
      </div>
    </div>
  );
}
