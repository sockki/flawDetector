'use client';

import { DBCardArrowIcon } from '@/public/index';
import { useDBCardStore } from '@/stores/DBCardStore';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

type DBCardProps = {
  title: string;
  date: Date;
  backgroundId: number;
};

export default function DBCard({ title, date, backgroundId }: DBCardProps) {
  const { isHoverFirstCard, setIsHoverFirstCard } = useDBCardStore();
  const conditionOfFirstDBCard = backgroundId === 1 && isHoverFirstCard;
  const backgroundById = (id: number) => {
    if (id === 1) {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/DBCardDummyImg1.png)]';
    } else if (id === 2) {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/DBCardDummyImg2.png)]';
    } else {
      return 'bg-[linear-gradient(360deg,rgba(0,0,0,0.7),rgba(255,255,255,0)),url(/images/DBCardDummyImg3.png)]';
    }
  };
  const onMouseOver2And3 = () => {
    if (backgroundId !== 1) {
      setIsHoverFirstCard(false);
    }
  };
  const onMouseOut2And3 = () => {
    if (backgroundId !== 1) {
      setIsHoverFirstCard(true);
    }
  };

  return (
    <div
      onMouseOver={onMouseOver2And3}
      onFocus={onMouseOver2And3}
      onMouseOut={onMouseOut2And3}
      onBlur={onMouseOut2And3}
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
        <DBCardArrowIcon className="z-20 cursor-pointer" />
      </div>
    </div>
  );
}
