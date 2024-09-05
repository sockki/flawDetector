import { DoubleCheckIcon, ListIcon } from '@/public/index';
import { twMerge } from 'tailwind-merge';

type ListHeaderProps = {
  onFileSelect: () => void;
  isMultipleSelected: boolean;
};

export function ListHeader({ onFileSelect, isMultipleSelected }: ListHeaderProps) {
  const containerStyles =
    'flex h-[7rem] w-[24.7rem] items-center justify-between rounded-t-[0.8rem] border-[0.1rem] border-gray-300 bg-purple-light p-[2rem]';

  const iconContainerStyles = 'flex h-[3rem] w-fit items-center justify-around gap-[1rem]';

  const checkIconStyles = twMerge(isMultipleSelected && '[&_*]:fill-primary-500', 'cursor-pointer');

  return (
    <div className={containerStyles}>
      <div className="text-[2rem]">Files</div>
      <div className={iconContainerStyles}>
        <DoubleCheckIcon onClick={onFileSelect} className={checkIconStyles} />
        <ListIcon />
      </div>
    </div>
  );
}
