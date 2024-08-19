import { twMerge } from 'tailwind-merge';

type InfoBoxProps = {
  theme: 'red' | 'primary' | 'gray';
  location?: boolean;
  bullet?: boolean;
  description: string[];
};

export default function InfoBox({ theme, location, bullet, description }: InfoBoxProps) {
  const themeClasses = {
    bg: {
      red: 'bg-red-light',
      primary: 'bg-purple-light',
      gray: 'bg-gray-light',
    },
    title: {
      red: 'text-system-warning',
      primary: 'text-primary-500',
      gray: 'text-[#3f3f3f]',
    },
    location: {
      red: 'border-system-warning text-system-warning',
      primary: 'border-primary-500 text-primary-500',
      gray: 'border-[#3f3f3f] text-[#3f3f3f]',
    },
    contentText: {
      gray: 'text-[#969696]',
    },
  };

  return (
    <div
      className={twMerge(
        'm-4·box-border·flex·h-auto·w-full·cursor-default·flex-col·gap-[1rem]·rounded-[1.2rem]·border·border-transparent p-[2rem]',
        themeClasses.bg[theme],
      )}
    >
      <div className="mb-2·flex·flex-nowrap·items-center justify-start gap-[0.8rem]">
        <h2 className={twMerge('text-[2.4rem] font-bold leading-[1.4]', themeClasses.title[theme])}>
          문제 코드
        </h2>
        {location && (
          <span
            className={twMerge(
              'inline-block whitespace-nowrap·rounded-full·border-[0.2rem]·px-[0.6rem]·py-[0.3rem]·text-[1.6rem]·font-bold·leading-[1.4]·tracking-[-0.01em]',
              themeClasses.location[theme],
            )}
          >
            위치보기
          </span>
        )}
      </div>
      <div className={twMerge(theme === 'gray' ? themeClasses.contentText.gray : '')}>
        <ul className="list-inside·flex-col·gap-[1rem]·pl-0·text-[1.8rem]·leading-[1.4]">
          {bullet ? (
            <li className="list-disc text-[1.8rem] font-normal leading-[1.4] tracking-[-0.01rem]">
              {description}
            </li>
          ) : (
            <li className="text-[1.8rem] font-normal leading-[1.4] tracking-[-0.01em]">
              {description}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
