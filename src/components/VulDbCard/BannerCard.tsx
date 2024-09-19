'use client';

import { BannerCardArrowIcon } from '@/public/index';
import { format } from 'date-fns';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

type BannerCardProps = {
  id: string;
  title: string;
  date: Date;
  backgroundId: number;
  isHoverFirstCard: boolean;
  setIsHoverFirstCard: Dispatch<SetStateAction<boolean>>;
};

export default function BannerCard({
  id,
  title,
  date,
  backgroundId,
  isHoverFirstCard,
  setIsHoverFirstCard,
}: BannerCardProps) {
  const conditionOfFirstBannerCard = backgroundId === 1 && isHoverFirstCard;
  const backgroundById = (bgId: number) => {
    if (bgId === 1) {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/BannerCardDummyImg1.png)]';
    } else if (bgId === 2) {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/BannerCardDummyImg2.png)]';
    } else {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/BannerCardDummyImg3.png)]';
    }
  };

  const handleHover = (isHovering: boolean) => {
    if (backgroundId !== 1) {
      setIsHoverFirstCard(isHovering);
    }
  };

  const hoverHandlers = {
    onMouseOver: () => handleHover(false),
    onFocus: () => handleHover(false),
    onMouseOut: () => handleHover(true),
    onBlur: () => handleHover(true),
  };

  return (
    <Link
      href={`/vulnerability-db/${id}`}
      {...hoverHandlers}
      className={twMerge(
        `group flex h-[39rem] rounded-[2rem] bg-cover p-[3.6rem] duration-500 hover:w-[62.5rem]`,
        backgroundById(backgroundId),
        conditionOfFirstBannerCard ? 'w-[62.5rem]' : 'w-[32rem]',
      )}
    >
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-col gap-[0.8rem]">
          <span
            className={twMerge(
              'line-clamp-4 font-bold text-white group-hover:w-[42rem] group-hover:text-[2.8rem] group-hover:leading-[3.389rem]',
              conditionOfFirstBannerCard
                ? 'w-[42rem] text-[2.8rem] leading-[3.389rem]'
                : 'w-[13.6rem] text-[1.8rem] leading-[2.178rem]',
            )}
          >
            {title}
          </span>
          <span
            className={twMerge(
              'font-medium text-gray-default group-hover:text-[2rem]',
              conditionOfFirstBannerCard ? 'text-[2rem]' : 'text-[1.2rem]',
            )}
          >
            {format(date, 'yyyy.MM.dd hh:mm:ss')}
          </span>
        </div>
        <BannerCardArrowIcon className="z-20 cursor-pointer" />
      </div>
    </Link>
  );
}
