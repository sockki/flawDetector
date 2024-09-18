import type { ElementByLabel, ScrapCardProps } from '@/types/scrapCard';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export default function ScrapCard({ title, date, label }: ScrapCardProps) {
  const elementByLabel: ElementByLabel = {
    warning: { labelStyle: 'bg-red-light text-system-warning', labelText: '취약성 경고' },
    notification: { labelStyle: 'bg-primary-50 text-primary-500', labelText: '취약성 알림' },
    report: { labelStyle: 'bg-gray-light text-gray-default', labelText: '취약성 보고서' },
  };

  const { labelStyle, labelText } = elementByLabel[label];

  return (
    <div className="relative flex h-[21.7rem] w-[42.2rem] flex-col rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] bg-white p-[2.8rem]">
      <label
        className={twMerge(
          'flex h-[3.5rem] w-fit items-center justify-center rounded-full px-[1.2rem] py-[0.8rem] text-[1.6rem] font-regular leading-[1.936rem]',
          labelStyle,
        )}
      >
        {labelText}
      </label>
      <div className="mt-[0.8rem] flex h-[7.2rem] w-[35.566rem] items-center">
        <span className="line-clamp-2 text-wrap text-[2.4rem] font-medium leading-[3.6rem]">
          {title}
        </span>
      </div>
      <span className="absolute bottom-[2.8rem] text-[1.6rem] font-regular leading-[2.24rem] text-gray-default">
        {format(date, 'yyyy.MM.dd hh:mm:ss')}
      </span>
    </div>
  );
}
