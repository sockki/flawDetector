import Image, { StaticImageData } from 'next/image';
import PinIcon from '@/public/icons/pinIcon.svg';
import ShareIcon from '@/public/icons/ShareIcon.svg';
import { twMerge } from 'tailwind-merge';

type ArticleSmallCardProps = {
  label: 'HOT' | 'NEW';
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
          <label className="flex h-[3.5rem] w-[5.9rem] items-center justify-center rounded-full bg-system-warning px-[1.2] py-[0.8rem] text-[1.6rem] font-bold leading-[1.936rem] text-white">
            {label}
          </label>
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
            <Image src={PinIcon} alt="PinIcon" className="h-[3.2rem] w-[3.2rem]" />
          </button>
          <button type="button">
            <Image src={ShareIcon} alt="ExternalLinkIcon" />
          </button>
        </div>
        <span className="text-[1.6rem] font-regular leading-[1.936rem] text-[#a2a2a2]">{date}</span>
      </footer>
    </article>
  );
}
