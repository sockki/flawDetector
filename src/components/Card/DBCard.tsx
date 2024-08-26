'use client';

import { DBCardArrowIcon } from '@/public/index';
import { useDBCardStore } from '@/stores/DBCardStore';
import { format } from 'date-fns';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type DBCardProps = {
  id: number;
  title: string;
  date: Date;
  backgroundId: number;
};

export default function DBCard({ id, title, date, backgroundId }: DBCardProps) {
  const { isHoverFirstCard, setIsHoverFirstCard } = useDBCardStore();
  const conditionOfFirstDBCard = backgroundId === 1 && isHoverFirstCard;
  const backgroundById = (bgId: number) => {
    if (bgId === 1) {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/DBCardDummyImg1.png)]';
    } else if (bgId === 2) {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/DBCardDummyImg2.png)]';
    } else {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/DBCardDummyImg3.png)]';
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
    <div
      {...hoverHandlers}
      className={twMerge(
        `group flex h-[39rem] rounded-[2rem] bg-cover p-[3.6rem] transition-all duration-500 ease-in-out hover:w-[62.5rem]`,
        backgroundById(backgroundId),
        conditionOfFirstDBCard ? 'w-[62.5rem]' : 'w-[31.6rem]',
      )}
    >
      <div className="flex w-full items-end justify-between">
        <div
          className={twMerge(
            'flex flex-col gap-[0.8rem] group-hover:w-[42rem]',
            conditionOfFirstDBCard ? 'w-[42rem]' : 'w-[13.6rem]',
          )}
        >
          <span
            className={twMerge(
              'line-clamp-4 font-bold text-white group-hover:text-[2.8rem] group-hover:leading-[3.389rem]',
              conditionOfFirstDBCard
                ? 'text-[2.8rem] leading-[3.389rem]'
                : 'text-[1.8rem] leading-[2.178rem]',
            )}
          >
            {title}
          </span>
          <span
            className={twMerge(
              'font-medium text-gray-default group-hover:text-[2rem]',
              conditionOfFirstDBCard ? 'text-[2rem]' : 'text-[1.2rem]',
            )}
          >
            {format(date, 'yyyy.MM.dd hh:mm:ss')}
          </span>
        </div>
        <Link href={`/vulnerability-db/${id}`}>
          <DBCardArrowIcon className="z-20 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}
