import { DoubleCheckIcon, ListIcon } from '@/public/index';

type ListHeaderProps = {
  onFileSelect: () => void;
};

export function ListHeader({ onFileSelect }: ListHeaderProps) {
  const containerStyles =
    'flex h-[7rem] w-[24.7rem] items-center justify-between rounded-t-[0.8rem] border-[0.1rem] border-gray-300 bg-primary-50 p-[2rem]';

  const iconContainerStyles = 'flex h-[3rem] w-fit items-center justify-around gap-[1rem]';

  return (
    <div className={containerStyles}>
      <div className="text-[2rem]">Files</div>
      <div className={iconContainerStyles}>
        <DoubleCheckIcon onclick={onFileSelect} />
        <ListIcon />
      </div>
    </div>
  );
}
