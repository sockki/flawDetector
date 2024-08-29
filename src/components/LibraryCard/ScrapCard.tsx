import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

type ScrapLabelType = 'warning' | 'notification' | 'report';

type ScrapCardProps = {
  title: string;
  date: Date;
  label: ScrapLabelType;
};

export default function ScrapCard({ title, date, label }: ScrapCardProps) {
  const labelText = (labelData: ScrapLabelType) => {
    if (labelData === 'warning') return '취약성 경고';
    else if (labelData === 'notification') return '취약성 알림';
    else return '취약성 보고서';
  };

  const labelStyle = (labelData: ScrapLabelType) => {
    if (labelData === 'warning') return 'bg-red-light text-system-warning';
    else if (labelData === 'notification') return 'bg-primary-50 text-primary-500';
    else return 'bg-gray-light text-gray-default';
  };
  return (
    <div className="relative flex h-[21.7rem] w-[42.2rem] flex-col rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] bg-white p-[2.8rem]">
      <label
        className={twMerge(
          'flex h-[3.5rem] w-fit items-center justify-center rounded-full px-[1.2rem] py-[0.8rem] text-[1.6rem] font-regular leading-[1.936rem]',
          labelStyle(label),
        )}
      >
        {labelText(label)}
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
