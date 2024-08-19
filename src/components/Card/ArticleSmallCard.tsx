import Image, { StaticImageData } from 'next/image';
import { twMerge } from 'tailwind-merge';
import { BigPinIcon, ShareIcon } from '@/public/index';
import SuggestionChip from '../Chips/SuggestionChip';

type ArticleSmallCardProps = {
  label: 'new' | 'hot' | 'warn' | 'notification' | 'report';
  imageSrc?: StaticImageData;
  title: string;
  content: string;
  date: string;
};

export default function ArticleSmallCard({
  label,
  imageSrc,
  title,
  content,
  date,
}: ArticleSmallCardProps) {
  return (
    <article
      className={twMerge(
        'relative flex h-fit w-[41.4rem] flex-col gap-[2.4rem] overflow-hidden rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] p-[2.8rem] hover:shadow-button',
        imageSrc ? 'active:border-[#9747ff] active:bg-none' : 'active:bg-purple-dark',
      )}
    >
      {imageSrc && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageSrc}
            alt="backgroundImage"
            className="object-cover object-center opacity-[0.16]"
            fill
          />
        </div>
      )}
      <div className="flex flex-col">
        <header className={twMerge('flex flex-col gap-[0.8rem]')}>
          <SuggestionChip label={label} variant={label} />
          <div className="flex h-fit w-full items-center">
            <h1 className="line-clamp-2 text-[2.4rem] font-medium leading-[3.6rem]">{title}</h1>
          </div>
        </header>
      </div>
      <span className="line-clamp-1 text-[2rem] font-regular leading-[2.42rem] text-gray-default">
        {content}
      </span>
      <footer className="flex items-center justify-between">
        <div className="flex gap-[1.2rem]">
          <button type="button">
            <BigPinIcon alt="PinIcon" className="h-[3.2rem] w-[3.2rem]" />
          </button>
          <button type="button">
            <ShareIcon alt="ExternalLinkIcon" />
          </button>
        </div>
        <span className="text-[1.6rem] font-regular leading-[1.936rem] text-[#a2a2a2]">{date}</span>
      </footer>
    </article>
  );
}
