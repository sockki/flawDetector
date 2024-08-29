'use client';

import {
  DetectFileCardArrowIcon,
  DetectFileCardBookStar,
  DetectFileCardBugIcon,
  DetectFileCardColorStar,
} from '@/public/index';
import { format } from 'date-fns';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type DetectFileLabelType = 'before' | 'under' | 'done';

type DetectFileCardProps = {
  title: string;
  label: DetectFileLabelType;
  date: Date;
  isBookmarked: boolean;
};

export default function DetectFileCard({ title, label, date, isBookmarked }: DetectFileCardProps) {
  const [isBookmark, setIsBookmark] = useState<boolean>(isBookmarked);
  const labelStyle = (labelData: DetectFileLabelType) => {
    if (labelData === 'before') return null;
    else if (labelData === 'under') return 'bg-gray-light text-gray-default';
    else return 'bg-primary-50 text-primary-500';
  };

  const labelText = (labelData: DetectFileLabelType) => {
    if (labelData === 'before') return '';
    else if (labelData === 'under') return '검사중';
    else return '검사완료';
  };

  const buttonText = (labelData: DetectFileLabelType) => {
    if (labelData === 'done') return '결과보기';
    else return '검사하기';
  };

  const onClickBookmark = () => {
    setIsBookmark(prev => !prev);
  };

  return (
    <div className="group relative flex h-[20rem] w-[31rem] cursor-pointer flex-col justify-between rounded-[1.2rem] border-[0.1rem] border-primary-100 p-[2rem]">
      <div className="flex justify-between">
        <div className="flex h-[3.9rem] items-center gap-[0.8rem]">
          {isBookmark && <DetectFileCardColorStar />}
          <span className="text-[2.8rem] font-medium leading-[3.9rem] text-gray-black">
            {title}
          </span>
        </div>

        <label
          className={twMerge(
            'w-fit rounded-full px-[1.2rem] py-[0.8rem] text-[1.6rem] font-medium leading-[2.24rem]',
            labelStyle(label),
          )}
        >
          {labelText(label)}
        </label>
      </div>
      <div className="flex items-end justify-between">
        <button
          type="button"
          className="flex items-center gap-[0.7rem] rounded-[1.4rem] bg-primary-500 p-[1rem]"
        >
          <DetectFileCardBugIcon />
          <span className="text-[2rem] font-regular leading-[2.8rem] text-white">
            {buttonText(label)}
          </span>
          <DetectFileCardArrowIcon />
        </button>
        <span className="text-[1.6rem] font-medium leading-[2.24rem] text-gray-default group-hover:hidden">
          {format(date, 'yy.MM.dd')}
        </span>
        <div
          onClick={onClickBookmark}
          className="hidden h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.2rem] border-[0.2rem] border-purple-200 hover:bg-primary-50 group-hover:flex"
        >
          {isBookmark ? (
            <DetectFileCardColorStar className="mt-[0.1rem] h-[2.8rem] w-[2.8rem]" />
          ) : (
            <DetectFileCardBookStar className="z-10" />
          )}
        </div>
      </div>
    </div>
  );
}
