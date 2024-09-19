import type { ArticleCardProps } from '@/types/articleCard';
import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import ScrapButton from '@/app/vulnerability-db/_components/ScrapButton';
import ShareButton from '@/app/vulnerability-db/_components/ShareButton';
import SuggestionChip from '../Chips/SuggestionChip';

export default function ArticleSmallCard({
  labelList,
  title,
  content,
  date,
  id,
  isScrapped,
}: ArticleCardProps) {
  const timeDifference = formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
  return (
    <article className="relative flex h-fit w-[41.4rem] flex-col gap-[2.4rem] overflow-hidden rounded-[0.8rem] border-[0.1rem] border-gray-middle p-[2.8rem] hover:shadow-button">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="w-fit">
            {labelList.map(label => (
              <SuggestionChip key={label} variant={label} />
            ))}
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
          <ScrapButton articleId={id} isScrapped={isScrapped} title={title} />
          <ShareButton title={title} />
        </div>
        <span className="text-[1.6rem] font-regular leading-[1.936rem] text-[#a2a2a2]">
          {timeDifference}
        </span>
      </div>
    </article>
  );
}
