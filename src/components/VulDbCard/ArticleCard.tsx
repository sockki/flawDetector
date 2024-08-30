import Image from 'next/image';

import { twMerge } from 'tailwind-merge';
import { ExternalLinkIcon, PinIcon } from '@/public/index';
import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import type { ArticleCardProps } from '@/types/articleCard';
import SuggestionChip from '../Chips/SuggestionChip';

export default function ArticleCard({
  label,
  imageSrc,
  title,
  company,
  content,
  date,
}: ArticleCardProps) {
  const timeDifference = formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
  return (
    <article
      className={twMerge(
        'flex h-fit w-[86.5rem] gap-[2.4rem] rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] p-[2.8rem] hover:shadow-button active:bg-purple-dark',
        imageSrc && 'px-[3.1rem]',
      )}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="articleImage"
          className="h-[26.2rem] w-[32rem] rounded-[0.8rem] object-cover"
        />
      )}
      <div className={twMerge('flex w-full flex-col gap-[2.4rem]', imageSrc && 'w-[45.9rem]')}>
        <div className="flex flex-col">
          <div
            className={twMerge('flex items-end gap-[0.8rem]', imageSrc && 'flex-col items-start')}
          >
            <SuggestionChip variant={label} />
            <div className={twMerge('w-full', imageSrc && 'flex h-[4.8rem] items-center')}>
              <h1
                className={twMerge(
                  'line-clamp-1 text-[2rem] font-regular leading-[2.42rem]',
                  imageSrc && 'line-clamp-2',
                )}
              >
                {title}
              </h1>
            </div>
          </div>
          <address className="mt-[0.8rem] text-[1.6rem] font-regular not-italic leading-[1.946rem] text-[#adadad]">
            {company}
          </address>
        </div>
        <div className="h-fit w-full rounded-[1.6rem] bg-gray-light p-[2rem]">
          <span className="line-clamp-2 text-[1.6rem] font-regular leading-[1.936rem] text-[#797979]">
            {content}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[1.2rem]">
            <button type="button">
              <PinIcon />
            </button>
            <button type="button">
              <ExternalLinkIcon />
            </button>
          </div>
          <span className="text-[1.6rem] font-regular leading-[1.936rem] text-[#a2a2a2]">
            {timeDifference}
          </span>
        </div>
      </div>
    </article>
  );
}
