import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { BigPinIcon, ShareIcon } from '@/public/index';
import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import type { ArticleCardProps } from '@/types/articleCard';
import SuggestionChip from '../Chips/SuggestionChip';

export default function ArticleSmallCard({
  label,
  imageSrc,
  title,
  content,
  date,
}: ArticleCardProps) {
  const timeDifference = formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
  return (
    <article
      className={twMerge(
        'relative flex h-fit w-[41.4rem] flex-col gap-[2.4rem] overflow-hidden rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] p-[2.8rem] hover:shadow-button',
        imageSrc ? 'active:border-[#9747ff] active:bg-none' : 'active:bg-purple-dark',
      )}
    >
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt="backgroundImage"
            className="object-cover opacity-[0.16]"
            fill
          />
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="w-fit">
            <SuggestionChip variant={label} />
          </div>
          <div className="mt-[1.6rem] flex h-fit w-full items-center">
            <h1 className="line-clamp-2 text-[2.4rem] font-medium leading-[3.6rem]">{title}</h1>
          </div>
        </div>
      </div>
      <span className="line-clamp-1 text-[2rem] font-regular leading-[2.42rem] text-gray-default">
        {content}
      </span>
      <div className="flex items-center justify-between">
        <div className="flex gap-[1.2rem]">
          <button type="button">
            <BigPinIcon className="h-[3.2rem] w-[3.2rem]" />
          </button>
          <button type="button">
            <ShareIcon />
          </button>
        </div>
        <span className="text-[1.6rem] font-regular leading-[1.936rem] text-[#a2a2a2]">
          {timeDifference}
        </span>
      </div>
    </article>
  );
}
