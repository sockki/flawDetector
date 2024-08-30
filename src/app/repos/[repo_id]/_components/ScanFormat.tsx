import { ReadingGlassesIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

export function ScanFormat() {
  const containerStyles = 'flex gap-[2.8rem]';
  const formatStyles =
    'flex h-[131rem] w-[148.4rem] items-center justify-center rounded-[0.8rem] border-[0.1rem] border-[#c3c3c3] bg-white';
  const contentStyles = 'flex flex-col items-center gap-[2rem] text-[3.2rem]';
  return (
    <div className={containerStyles}>
      <div className={formatStyles}>
        <div className={twMerge(contentStyles, 'text-primary-500')}>
          <ReadingGlassesIcon />
          파일을 선택하세요
        </div>
      </div>
    </div>
  );
}
